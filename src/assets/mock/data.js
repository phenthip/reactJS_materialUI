
var plant_id = ["BKF","BPF","HYF","KRF","LPF","PLF","PTF","LBF","SRF","KTF","TRF","KKF"]
var plant = [];
for (let i = 0; i < plant_id.length; i++) {
    plant.push({
        "id" : i,
        "plant_id" : plant_id[i],
        "picture" : "/static/images/9795.jpg"       
    })
}
export default plant;
