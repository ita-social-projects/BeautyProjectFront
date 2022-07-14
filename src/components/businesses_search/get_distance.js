
export function getDistance(lat_t, lon_t, lat_b, lon_b) {
    const p = 0.017453292519943295;    // Math.PI / 180

    let degree = 0.5 - Math.cos((lat_b - lat_t) * p) / 2 + Math.cos(lat_t * p) * Math.cos(lat_b * p) *
        (1 - Math.cos((lon_b - lon_t) * p)) / 2;
    let result = 12742 * Math.asin(Math.sqrt(degree))

    let precision = 100
    if (result < 200) {
        precision = 10
    }

    return Math.round(result / precision) * precision
}
