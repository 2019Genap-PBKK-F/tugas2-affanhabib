const express = require("express")
const app = express()
const sql = require('mssql')
const hostname = '10.199.14.46'
const port = 8018

//CORS Middleware
app.use(function (req, res, next) {
   //Enabling CORS 
   res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, *")
   next()
})

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const config = {
   user: 'sa',
   password: 'SaSa1212',
   server: '10.199.13.253',
   database: 'nrp05111740000091'
}

var executeQuery = function(res, query, model, reqType) {
   sql.connect(config, function(err){
      if(err) {
      res.end('Connection Error\n' + err)
      }
      else {
         var request = new sql.Request()
         if(reqType != 0) {
            model.forEach(function(m)
            {
               request.input(m.name, m.sqltype, m.value)
            })
         }
         request.query(query, function(err, response){
            if(err) {
               console.log('Query Error\n' + err)
            }
            else{
               // console.log(response.recordset)
               res.send(response.recordset)
            }
         })
      }
   })
}

//FP
// publikasi
app.get("/api/publikasi/", function(req, res)
{
    var query = "select * from publikasi"
    executeQuery(res, query, null, 0);
});
// abmas
app.get("/api/abmas/", function(req, res)
{
    var query = "select * from abmas"
    executeQuery(res, query, null, 0);
});
// dosen
app.get("/api/dosen/", function(req, res)
{
    var query = "select * from dosen"
    executeQuery(res, query, null, 0);
});
// penelitian
app.get("/api/penelitian/", function(req, res)
{
    var query = "select * from penelitian"
    executeQuery(res, query, null, 0);
});

//Data Dasar

//Select
app.get("/api/data-dasar/", function(req, res)
{
   var query = "select * from DataDasar"
   executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/nama", function(req, res)
{
   var query = 'select id,nama as name from DataDasar'
   executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/:id",function(req, res)
{
   var query = "select * from DataDasar where id=" + req.params.id
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/data-dasar/", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date )'
               + 'values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date )'
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/data-dasar/:id", function(req, res) {
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = 'update DataDasar set nama = @nama, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date where id = @id'
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/data-dasar/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
   ]

   var query = "delete from DataDasar where id = @id"
   executeQuery(res, query, model, 1)
})

//Aspek

//Select
app.get("/api/aspek/", function(req, res)
{
   var query = "select * from Aspek"
   executeQuery(res, query, null, 0)
})

app.get("/api/aspek/nama", function(req, res)
{
   var query = 'select id,aspek as name from Aspek'
   executeQuery(res, query, null, 0)
})

app.get("/api/aspek/komponen", function(req, res)
{
   var query = 'select id,komponen_aspek from Aspek'
   executeQuery(res, query, null, 0)
})

app.get("/api/aspek/:id",function(req, res)
{
   var query = "select * from Aspek where id=" + req.params.id
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/aspek/", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
      { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
   ]

   var query = 'insert into Aspek ( aspek, komponen_aspek ) values( @aspek, @komponen_aspek )'
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/aspek/:id", function(req, res) {
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
      { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
   ]

   var query = 'update Aspek set aspek = @aspek, komponen_aspek = @komponen_aspek where id = @id'
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/aspek/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
   ]

   var query = "delete from Aspek where id = @id"
   executeQuery(res, query, model, 1)
})

//Jenis SatKer 

//Select
app.get("/api/jenis-satker/", function(req, res)
{
   var query = "select * from JenisSatker"
   executeQuery(res, query, null, 0)
})

app.get("/api/jenis-satker/nama", function(req, res)
{
   var query = "select id,nama as name from JenisSatker"
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/jenis-satker/", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Numeric, value: req.body.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = 'insert into JenisSatker ( nama, create_date, last_update, expired_date )'
               + 'values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date )'
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/jenis-satker/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Numeric, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = "update JenisSatker set nama = @nama, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date where id = @id" 
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/jenis-satker/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Numeric, value: req.params.id }
   ]

   var query = "delete from JenisSatker where id = @id" 
   executeQuery(res, query, model, 1)
})

//Periode

//Select
app.get("/api/periode/", function(req, res)
{
   var query = "select * from Periode"
   executeQuery(res, query, null, 0)
})

app.get("/api/periode/nama", function(req, res)
{
   var query = "select id,nama as name from Periode"
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/periode/", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Numeric, value: req.body.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
   ]

   var query = "insert into Periode (nama, create_date, last_update) values (@nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/periode/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Numeric, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]

   var query = "update Periode set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id" 
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/periode/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Numeric, value: req.params.id }
   ]

   var query = "delete from Periode where id = @id"
   executeQuery(res, query, model, 1)
})

//Master Indikator

//Select
app.get("/api/master-indikator/", function(req, res)
{
   var query = "select * from MasterIndikator"
   executeQuery(res, query, null, 0)
})

app.get("/api/master-indikator/nama", function(req, res)
{
   var query = "select id,nama as name from MasterIndikator"
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/master-indikator/", function(req, res)
{
  var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
      { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_penyebut },
      { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_pembilang },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
      { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = "insert into MasterIndikator( id_aspek, id_pembilang, id_penyebut, nama, deskripsi, default_bobot, create_date, last_update, expired_date )"
               + "values ( @id_aspek, @id_pembilang, @id_penyebut, @nama, @deskripsi, @default_bobot, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date)"
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/master-indikator/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
      { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_penyebut },
      { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_pembilang },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
      { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = "update MasterIndikator set id_aspek = @id_aspek, id_pembilang = @id_pembilang, id_penyebut = @id_penyebut, nama = @nama, deskripsi = @deskripsi," 
               + " default_bobot = @default_bobot, expired_date = @expired_date, last_update = CURRENT_TIMESTAMP where id = @id"
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/master-indikator/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
   ]
  
   var query = "delete from MasterIndikator where id = @id"
   executeQuery(res, query, model, 1)
})

//Indikator Periode

//Select
app.get("/api/indikator-periode", function(req, res)
{
   var query = "select * from Indikator_Periode"
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/indikator-periode", function(req, res)
{
   var model = [
      { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
      { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
      { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
   ]

   var query = "insert into Indikator_Periode values( @id_master, @id_periode, @bobot )"
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/indikator-periode/:id&id2", function(req, res)
{
   var model = [
      { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
      { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
      { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'id2', sqltype: sql.Numeric, value: req.params.id2 }
   ]

   var query = "update Indikator_Periode set id_master = @id_master, id_periode = @id_periode, bobot = @bobot"
               + "where id_master = @id and id_periode = @id2"
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/indikator-periode/:id&:id2", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'id2', sqltype: sql.Numeric, value: req.params.id2 }
   ]

   var query = "delete from Indikator_Periode where id_master = @id_master and id_periode = @id_periode"
               + "where id_master = @id and id_periode = @id2"
   executeQuery(res, query, model, 1)
})

//Satuan Kerja

//Select
app.get("/api/satuan-kerja/", function(req, res)
{
   var query = "select * from SatuanKerja"
   executeQuery(res, query, null, 0)
})

app.get("/api/satuan-kerja/nama", function(req, res)
{
   var query = "select id,nama as name from SatuanKerja"
   executeQuery(res, query, null, 0)
})

app.get("/api/SatuanKerja/name", function(req, res)
{
   var query = "SELECT distinct SatuanKerja.id,SatuanKerja.nama from SatuanKerja inner join Indikator_SatuanKerja on SatuanKerja.id=Indikator_SatuanKerja.id_satker"
   executeQuery(res, query, null, 0);
});

//Insert
app.post("/api/satuan-kerja/", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.VarChar, value: req.body.id },
      { name: 'id_jns_satker', sqltype: sql.Numeric, value: req.body.id_jns_satker },
      { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'email', sqltype: sql.VarChar, value: req.body.email },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]   

   var query = "insert into SatuanKerja values( @id, @id_jns_satker, @id_induk_satker, @nama, @email, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date)"
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/satuan-kerja/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.VarChar, value: req.params.id },
      { name: 'id_jns_satker', sqltype: sql.Numeric, value: req.body.id_jns_satker },
      { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'email', sqltype: sql.VarChar, value: req.body.email },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date },
      { name: 'idbaru', sqltype: sql.VarChar, value: req.body.idbaru}
   ]

   // var query = "update SatuanKerja set id = @idbaru, id_jns_satker = @id_jns_satker, id_induk_satker = @id_induk_satker, nama = @nama, email = @email, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date " +
   //             "where id = @id"
   var query = "update SatuanKerja set email = @email, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date where id = @id"
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/satuan-kerja/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.VarChar, value: req.params.id }
   ]

   var query = "delete from SatuanKerja where id = @id"
   executeQuery(res, query, model, 1)
})

//Capaian Unit

//Select
app.get("/api/capaian-unit/",function(req, res)
{
   var query = "select * from Capaian_Unit"
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/capaian-unit/", function(req, res)
{
   var model = [
      { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
      { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
      { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
   ]

   var query = "insert into Capaian_Unit values( @id_satker, @id_datadasar, CURRENT_TIMESTAMP, @capaian )"
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/capaian-unit/:id&:id2", function(req, res)
{
   var model = [
      { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
      { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
      { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
      { name: 'id', sqltype: sql.UniqueIdentifier, value: req.params.id },
      { name: 'id2', sqltype: sql.Int, value: req.params.id2 }
   ]

   var query = "update Capaian_Unit set id_satker = @id_satker, id_dasar = @id_dasar, capaian = @capaian where id_satker = @id and id_datadasar = @id2"
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/capaiam-unit/:id&:id2", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.UniqueIdentifier, value: req.params.id },
      { name: 'id2', sqltype: sql.Int, value: req.params.id2 }
   ]

   var query = "delete from Capaian_Unit where id_satker = @id and id_datadasar = @id2"
   executeQuery(re, query, model, 1)
})

//Indikator Satuan Kerja

//Select
app.get("/api/indikator-satuan-kerja/", function(req, res)
{
   var query = "select * from Indikator_SatuanKerja"
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/indikator-satuan-kerja/", function(req, res)
{
   var model = [
      { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
      { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
      { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
      { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
      { name: 'target', sqltype: sql.Float, value: req.body.target },
      { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
   ]

   var query = "insert into Indikator_SatuanKerja (id_periode, id_master, id_satker, bobot, targer, capaian, last_update) values (@id_periode, @id_master, @id_satker, @bobot, @target, @capaian, CURRENT_TIMESTAMP)"
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/indikator-satuan-kerja/:id&:id2&:id3", function(req, res)
{
   var model = [
      { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
      { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
      { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
      { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
      { name: 'target', sqltype: sql.Float, value: req.body.target },
      { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
      { name: 'id', sqltype: sql.Numeric, value: req.params.id },
      { name: 'id2', sqltype: sql.Int, value: req.params.id2 },
      { name: 'id3', sqltype: sql.VarChar, value: req.params.id3 }
  ]

   var query = "update Indikator_SatuanKerja set id_periode = @id_periode, id_master = @id_master, id_satker = @id_satker, bobot = @bobot, targer = @target, " +
               "capaian = @capaian, last_update = CURRENT_TIMESTAMP where id_periode = @id and id_master = @id2 and id_satker = @id3"
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/indikator-satuan-kerja/:id&:id2&:id3", function(req, res)
{
   var model = [
      { name: 'id_periode', sqltype: sql.Numeric, value: req.params.id },
      { name: 'id_master', sqltype: sql.Int, value: req.params.id2 },
      { name: 'id_satker', sqltype: sql.VarChar, value: req.params.id3 }
   ]

   var query = "delete from Indikator_SatuanKerja where id_periode = @id_periode and id_master = @id_master and id_satker = @id_satker"
   executeQuery(res, query, model, 1)
})

//Log Indikator Satuan Kerja

//Select
app.get("/api/log-indikator-satker", function(req, res){
   var query = "select * from Indikator_SatuanKerja_Log"
   executeQuery(res, query, null, 0)
})

//Konkin
app.get('/api/konkin/', function(req, res){
   var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot,isk.capaian,isk.capaian as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id";
   executeQuery(res, query, null, 0);
})

app.get("/api/konkin/:id", function(req, res)
{
    var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot,isk.capaian,isk.capaian as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id where isk.id_satker='"+req.params.id+"'";
    executeQuery(res, query, null, 0);
});

// auth
app.get('/auth/login/:email', function(req, res)
{
   var model = [
      { name: 'email', sqltype: sql.VarChar, value: req.params.email }
   ]
   var query = 'select id, nama, email from SatuanKerja where email = @email'

  executeQuery(res, query, model, 1)
})

//  LISTEN

app.listen(port, hostname, function () {
   var message = "Server runnning on Port: " + port;
   console.log(message);
});

// app.listen(8010, function () {
//    console.log('Listen on port 8010')
// })