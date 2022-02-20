module.exports = function(id, defaultTime, fs){
    const interval = setInterval(
        ()=>{
            if(defaultTime === 1){
                fs.readFile('data/current-players.json', 'utf8', (err,data)=>{
                    if(err) throw err;
                    else{
                        const arr = JSON.parse(data);
                        indexPlayer = arr.findIndex(k=>{
                            return k.id === id;
                        });
                        arr[indexPlayer].timerCheck = false;
                        fs.writeFileSync('data/current-players.json', JSON.stringify(arr));
                    };
                    clearInterval(interval);
                })
            }
            else defaultTime--;
        }
        ,1000
    );
    return;
}