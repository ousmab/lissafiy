import SQLite from "react-native-sqlite-storage";

export  function  openDb(){
    //SQLite.enablePromise(true)
    //SQLite.enablePromise(true);
    return SQLite.openDatabase(
        {name: 'lissafiyxx.db', location: 'default'}, 
        (success)=>{
            //console.log("success ", success)
        }, 
        (error)=>{
            //console.log("error ", error)
        });
}




