using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Web.Http;

namespace SqlNotebookApiServer.Controllers
{
    /// <summary>
    /// The execution controller deals with creating a connection to a sql server 
    /// instance and running queries and retreiving results
    /// </summary>
    public class ExecutionController : ApiController
    {
        public ExecutionContextManager CM = new ExecutionContextManager();

        [HttpPost]
        public Guid CreateExecutionContext(string Database, string Server, string Username, string Password) {
            return CM.New(Database, Server, Username, Password);
        }

        [HttpPost]
        public async Task<JValue> Execute(Guid Context, string query)
        {
            var context = CM.Get(Context);
            var result = await new SqlCommand(query, context).ExecuteReaderAsync();
            var resultObj = new ExecutionResult(result);
            var resultJson = JsonConvert.SerializeObjectAsync(resultObj);
        }
    }

    public class ExecutionContextManager
    {
        private Dictionary<Guid, SqlConnection> Contexts;

        public Guid New(string Database, string Server, string Username, string Password)
        {
            var g = Guid.NewGuid();
            var connectionString = new SqlConnectionStringBuilder() {
                ApplicationName = "SqlNotebook",
                InitialCatalog = Database,
                Password = Password,
                UserID = Username
            };
            connectionString["server"] = Server;
            var context = new SqlConnection(connectionString.ConnectionString);
            context.Open();
            Contexts[g] = context;
            return g;
        }

        public SqlConnection Get(Guid context)
        {
            return Contexts.ContainsKey(context) ? Contexts[context] : null;
        }
    }

    public class ExecutionResult
    {
        public List<PartialResult> Parts = new List<PartialResult>();
        public ExecutionResult(SqlDataReader result)
        {
            while (result.HasRows)
            {
                var Part = new PartialResult(result);
                result.NextResult();
                Parts.Add(Part);
            }
        }
    }

    public class PartialResult
    {
        public List<PartialColumn> Columns;
        public List<PartialRow> Rows;
        public PartialResult(SqlDataReader result)
        {
            ParseColumns(result);
            while (result.Read())
            {
                var row = new PartialRow(result);
            }
        }

        private void ParseColumns(SqlDataReader result)
        {
            for(var i = 0; i < result.FieldCount; i++)
            {
                var col = new PartialColumn(result, i);
                Columns.Add(col);
            }
        }
    }

    public class PartialColumn
    {
        public string Type;
        public string Name;
        public PartialColumn(SqlDataReader result, int i)
        {
            Type = result.GetFieldType(i).ToString();
            Name = result.GetName(i);
        }
    }

    public class PartialRow
    {
        public object[] Values;
        public PartialRow(SqlDataReader result)
        {
            result.GetValues(Values);
        }
    }

}