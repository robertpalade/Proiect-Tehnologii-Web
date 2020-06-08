function prepare(text) {
    result = text;
    while (result.indexOf("+") != -1) {
      var result = result.replace("+", "%2B");
    }
      return result;
  }