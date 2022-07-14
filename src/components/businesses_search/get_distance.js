
export function getDistance(lat_t, lon_t, lat_b, lon_b) {

    let R = 6378.137; // Radius of earth in KM
    let dLat = lat_b * Math.PI / 180 - lat_t * Math.PI / 180;
    let dLon = lon_b * Math.PI / 180 - lon_t * Math.PI / 180;
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat_t * Math.PI / 180) * Math.cos(lat_b * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    let result = d * 1000; // meters

    let precision = 100
    if (result < 300) {
        precision = 20
    }

    return Math.round(result / precision) * precision
}
