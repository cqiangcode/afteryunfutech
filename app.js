var find = {
    findNodes (callback) {
        callback();
    }
}
color = "red";
var myapp = {
    color: "green",
    paint () {
        console.log(this.color);
    }
}
find.findNodes(myapp.paint)