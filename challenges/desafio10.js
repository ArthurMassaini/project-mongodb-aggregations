db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: { $abs: { $subtract: ["$startTime", "$stopTime"] } },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] },
      _id: 0,
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
