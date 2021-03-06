//webskeleton-types
//converting type values (int) to string representation of the type
//used in javascript code on client side
var gkwebapp_T_OrgTypes = [{text: "ORG", value: 0}, {text: "PER", value: 1}];
var gkwebapp_T_RoleTypes = [{text: "Benutzer", value: 0}, {text: "Administrator", value: 1}];
var gkwebapp_T_ContactTypes = [{text: "Kunde", value: 0}, {text: "Lieferant", value: 1}, {text: "Partner", value: 2}, {text: "Interessent", value: 3}, {text: "Werbung", value: 4}];

function gkwebapp_format_curr(num) {
  var str = num.toString().replace("$", ""),
    parts = false,
    output = [],
    i = 1,
    formatted = null;
  if (str.indexOf(".") > 0) {
    parts = str.split(".");
    str = parts[0];
  }
  str = str.trim().split("").reverse();
  for (var j = 0, len = str.length; j < len; j++) {
    if (str[j] != ".") {
      output.push(str[j]);
      if (i % 3 == 0 && j < len - 1) {
        output.push(".");
      }
      i++;
    }
  }
  formatted = output.reverse().join("");
  if (formatted.substr(0, 2) == "-.") {
    formatted = "-" + formatted.substr(2);
  }
  return formatted + (parts ? "," + parts[1].substr(0, 2) : "");
}

export {gkwebapp_T_ContactTypes, gkwebapp_T_OrgTypes, gkwebapp_T_RoleTypes, gkwebapp_format_curr};