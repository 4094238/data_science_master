const contents = [
    {
        content: "C:\\Users\\Agustin Ianchina\\OneDrive\\Documents\\Agustín NOTEBOOK\\Ingeniería\\Master UCM\\2-NoSQL\\movies.json",
        collection: "movies",
        idPolicy: "drop_collection_first", //overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
        //Use the transformer to customize the import result
        //transformer: (doc)=>{ //async (doc)=>{
        //   doc["importDate"]= new Date()
        //   return doc; //return null skips this doc
        //}
    }
];

mb.importContent({
    connection: "localhost",
    database: "test",
    fromType: "file",
    batchSize: 2000,
    contents
})

db.movies.find()

db.movies.count()

var peli = { "title": "Película inventada", "year": 2021, "cast": ["actor1", "actor2"], "genre": "invento" }
db.movies.insertOne(peli)

var query1 = { "title": "Película inventada" }
db.movies.find(query1)

db.movies.deleteOne(query1)

var query1 = { "title": "Película inventada" }
db.movies.find(query1)

var query1 = { "cast": "and" }
db.movies.find(query1).count()

var query0 = {}
var query1 = { "cast": "and" }
db.movies.updateMany(query0, { $pull: { cast: "and" } })

var query1 = { "cast": "and" }
db.movies.find(query1).count()

var query1 = { "cast": { $size: 0 } }
db.movies.find(query1).count()

var query1 = { "cast": { $size: 0 } }
var operation = { $set: { "cast": ["Undefined"] } }
db.movies.updateMany(query1, operation)
var query1 = { "cast": ["Undefined"] }
db.movies.find(query1)

var query1 = { "genres": { $size: 0 } }
db.movies.find(query1).count()

var query1 = { "genres": { $size: 0 } }
var operation = { $set: { "genres": ["Undefined"] } }
db.movies.updateMany(query1, operation)

db.movies.find({ "genres": ["Undefined"] })

db.movies.find({}, { "year": 1 }).sort({ year: -1 }).limit(1)

//hacer un group por año, dsps limit 20, dsps contar o sumar

var query1 = { "_id": "$year", "numero": { $sum: 1 } }
var fase1 = { $group: query1 }
var query2 = { "_id": -1 }
var fase2 = { $sort: query2 }
var fase3 = { $limit: 20 }
var query4 = { "_id": null, "total": { $sum: "$numero" } }
var fase4 = { $group: query4 }
db.movies.aggregate(fase1, fase2, fase3, fase4)

var query0 = { "year": { $gte: 1960, $lte: 1969 } }
var fase0 = { $match: query0 }
var query1 = { "_id": "$year", "numero": { $sum: 1 } }
var fase1 = { $group: query1 }
var query4 = { "_id": null, "total": { $sum: "$numero" } }
var fase4 = { $group: query4 }
db.movies.aggregate(fase0, fase1, fase4)

//agrupar y dsps filtrar por el max

var query1 = { "_id": "$year", "numero": { $sum: 1 } }
var fase1 = { $group: query1 } // tabla _id,numero
var query2 = { "_id": null, "maximo": { $max: "$numero" } }
var fase2 = { $group: query2 } //tabla _id,maximo
var out = { $out: "valmax" }
db.movies.aggregate(fase1, fase2, out)
var max_value = db.valmax.findOne()
var fase3 = { $match: { numero: max_value.maximo } }
db.movies.aggregate(fase1, fase3)

var query1 = { "_id": "$year", "numero": { $sum: 1 } }
var fase1 = { $group: query1 } // tabla _id,numero
var query2 = { "_id": null, "minimo": { $min: "$numero" } }
var fase2 = { $group: query2 } //tabla _id,maximo
var out = { $out: "valmin" }
db.movies.aggregate(fase1, fase2, out)
var min_value = db.valmin.findOne()
var fase3 = { $match: { numero: min_value.minimo } }
db.movies.aggregate(fase1, fase3)

db.movies.find({ "title": "Second Act" })

var fase1 = { $unwind: "$cast" }
var project = { "_id": 0 }
var fase2 = { $project: project }
var out = { $out: "actors" } // creación actors
db.movies.aggregate(fase1, fase2, out)
db.actors.count()

db.actors.find()

var query1 = { "cast": { $ne: "Undefined" } }
var fase1 = { $match: query1 }
var query2 = { "_id": "$cast", "numero": { $sum: 1 } }
var fase2 = { $group: query2 }
db.actors.aggregate(fase1, fase2).limit(5)

var query1 = { "cast": { $ne: "Undefined" } }
var fase1 = { $match: query1 }
var query2 = { "_id": { "title": "$title", "year": "$year" }, "count": { $sum: 1 } }
var fase2 = { $group: query2 }
db.actors.aggregate(fase1, fase2).limit(5)

var query2 = { "_id": "$cast", "min": { $min: "$year" }, "max": { $max: "$year" } }
var fase2 = { $group: query2 }
var operacion = { $subtract: ["$max", "$min"] }
var query3 = { "anios": operacion }
var fase3 = { $addFields: query3 }
var fase4 = { $sort: { "anios": -1 } }
db.actors.aggregate(fase2, fase3, fase4).limit(5)

db.actors.find()

var fase1 = { $unwind: "$genres" }
var project = { "_id": 0 }
var fase2 = { $project: project }
var out = { $out: "genres" } // creación genres
db.actors.aggregate(fase1, fase2, out)
db.genres.count()
db.genres.find()

// filtrar cast = Undefined, agrupar y contar generos, push arma el array con los genres

var query0 = { "cast": { $ne: "Undefined" } }
var fase0 = { $match: query0 }
var query1 = { "genres": { $ne: "Undefined" } }
var fase1 = { $match: query1 }
var query2 = { "_id": "$cast", "all_genres": { $addToSet: "$genres" } }
var fase2 = { $group: query2 }
var query3 = { "number_of_genres": { $size: "$all_genres" } }
var fase3 = { $addFields: query3 }
var fase4 = { $sort: { number_of_genres: -1 } }
db.genres.aggregate(fase0, fase1, fase2, fase3, fase4).limit(5)

db.actors.find()
var query1 = { "genres": { $ne: "Undefined" } }
var fase1 = { $match: query1 }
var query2 = { "_id": "$year", "all_genres": { $addToSet: "$genres" } }
var fase2 = { $group: query2 }
var query3 = { "number_of_genres": { $size: "$all_genres" } }
var fase3 = { $addFields: query3 }
var fase4 = { $sort: { number_of_genres: -1 } }
db.genres.aggregate(fase1, fase2, fase3, fase4).limit(5)

var query1 = { "genres": { $ne: "Undefined" } }
var fase1 = { $match: query1 }
var query2 = { "_id": { "title": "$title", "year": "$year" }, "all_genres": { $addToSet: "$genres" } }
var fase2 = { $group: query2 }
var query3 = { "number_of_genres": { $size: "$all_genres" } }
var fase3 = { $addFields: query3 }
var fase4 = { $sort: { number_of_genres: -1 } }
db.genres.aggregate(fase1, fase2, fase3, fase4).limit(5)

db.genres.find()

//var query0 = {"genres":{$ne:"Undefined"}}
//var fase0 = {$match: query0}
//var project = {$project:{title:1,genres:1}}

//var query1 = {"_id":"$genres", count:{$sum:1}}
//var fase1 = {$group:query1}
//var fase2 = {$arrayToObject: "$_id"}
//var out = {$out:"top5genres"}
//db.genres.aggregate(fase0,project).createIndex({title:1, genres:1},{unique:true})

     )
//db.top5genres.find()

//array = db.top5genres.distinct("_id")
//var query1 = {genres:{$in:array}}
//var fase1 = {$match:query1}

//db.genres.aggregate(fase1)
db.movies.find()

var fase1 = { $unwind: "$genres" }
var query2 = { "genres": { $ne: "Undefined" } }
var fase2 = { $match: query2 }
var fase3 = { $project: { cast: 0 } }
var query4 = { "_id": "$genres", "count": { $sum: 1 } }
var fase4 = { $group: query4 }
var fase5 = { $sort: { count: -1 } }
var fase6 = { $limit: 5 }
db.movies.aggregate(fase1, fase2, fase3, fase4, fase5, fase6)

var fase1 = { $unwind: "$genres" }
var query2 = { "genres": { $ne: "Undefined" } }
var fase2 = { $match: query2 }
var fase3 = { $project: { cast: 0 } }
var query4 = { "_id": "$genres", "count": { $sum: 1 } }
var fase4 = { $group: query4 }
var fase5 = { $sort: { count: -1 } }
var fase6 = { $limit: 1 }
var out = { $out: "topgenre" }
db.movies.aggregate(fase1, fase2, fase3, fase4, fase5, fase6, out)
var generotop = db.topgenre.findOne()
var fase7 = { $match: { genres: generotop._id } } //match contra topgenre
var query8 = { "_id": "$year", "count": { $sum: 1 } }
var fase8 = { $group: query8 }//group por año
var fase9 = { $sort: { count: -1 } }
db.movies.aggregate(fase1, fase2, fase3, fase7, fase8, fase9).limit(5)


db.actors.find()
// eliminar cast undefined, unwind genres, matchear top genre, group cast/sum1
var query1 = { "cast": { $ne: "Undefined" } }
var fase1 = { $match: query1 }
var fase2 = { $unwind: "$genres" }
var generotop = db.topgenre.findOne()
var fase3 = { $match: { genres: generotop._id } }
var query4 = { "_id": "$cast", "count": { $sum: 1 }, "comienzo": { $min: "$year" }, "fin": { $max: "$year" } }
var fase4 = { $group: query4 }
var fase5 = { $sort: { count: -1 } }
var fase6 = { $limit: 5 }
db.actors.aggregate(fase1, fase2, fase3, fase4, fase5, fase6)
