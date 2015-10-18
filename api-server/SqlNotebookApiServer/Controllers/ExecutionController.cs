using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net.Http;
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
        public static ExecutionContextManager CM = new ExecutionContextManager();
        
        public string Test() { return "efwf"; }

        [HttpPost]
        public Guid CreateExecutionContext(ExecutionContextManager.ContextRequest Req) {
            return CM.New(Req);
        }

        [HttpPost]
        public ExecutionResult Execute(Guid? id, [FromBody] string query)
        {
            var context = CM.Get(id.Value);
            
            var command = new SqlCommand(query, context);
            var result = command.ExecuteReader();
            var resultObj = new ExecutionResult(result);
            return resultObj;
        }
    }

    public class ExecutionContextManager
    {
        private Dictionary<Guid, SqlConnection> Contexts = new Dictionary<Guid, SqlConnection>();

        public Guid New(ContextRequest Req)
        {
            var g = Guid.NewGuid();
            var connectionString = new SqlConnectionStringBuilder() {
                ApplicationName = "SqlNotebook",
                InitialCatalog = Req.Database,
                Password = Req.Password,
                UserID = Req.Username
            };
            connectionString["server"] = Req.Server;
            var context = new SqlConnection(connectionString.ConnectionString);
            context.Open();
            Contexts[g] = context;
            return g;
        }

        public SqlConnection Get(Guid context)
        {
            return Contexts.ContainsKey(context) ? Contexts[context] : null;
        }

        public class ContextRequest
        {
            public string Database { get; set; }
            public string Server { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
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
        public List<PartialColumn> Columns = new List<PartialColumn>();
        public List<PartialRow> Rows = new List<PartialRow>();
        public PartialResult(SqlDataReader result)
        {
            ParseColumns(result);
            while (result.Read())
            {
                var row = new PartialRow(result);
                Rows.Add(row);
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
            Values = new object[result.FieldCount];
            result.GetValues(Values);
        }
    }

}