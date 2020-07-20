var function_logger = function() {
  reutrn {
    log: function() {
      console.log(this.val);
    }
  }
}
var fat_arror_logger = function() {
  return {
    log: () =>) {
      console.log(this.val);
    }
  };
}