import  mongoose from "mongoose";

const DataBase:any = process.env.DATABASE_KEY;

const cluSterDb = process.env.CLUSTER_DB;

mongoose
  .connect(DataBase, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Good Job Your Data Base connection is Success. ${DataBase}`);
  })
  .catch((err) => {
    console.log("............. No connection ..............." + err);
  });
