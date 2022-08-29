<HTML>
<HEAD>
<TITLE>ENIGMA XOR MACHINE</TITLE>
<SCRIPT LANGUAGE="JavaScript">
function encrypt(str, pwd) {
  if(pwd == null || pwd.length <= 0) {
    alert("Por favor entre com a senha para encriptar a mensagem.");
    return null;
  }
  var prand = "";
  for(var i=0; i<pwd.length; i++) {
    prand += pwd.charCodeAt(i).toString();
  }
  var sPos = Math.floor(prand.length / 5);
  var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
  var incr = Math.ceil(pwd.length / 2);
  var modu = Math.pow(2, 31) - 1;
  if(mult < 2) {
    alert("Algoritmo não pode encontrar um hash compatível. Por favor escolha outra senha. \nConsideracoes possíveis escolha uma senha mais difícil ou maior.");
    return null;
  }
  var salt = Math.round(Math.random() * 1000000000) % 100000000;
  prand += salt;
  while(prand.length > 10) {
    prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
  }
  prand = (mult * prand + incr) % modu;
  var enc_chr = "";
  var enc_str = "";
  for(var i=0; i<str.length; i++) {
    enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
    if(enc_chr < 16) {
      enc_str += "0" + enc_chr.toString(16);
    } else enc_str += enc_chr.toString(16);
    prand = (mult * prand + incr) % modu;
  }
  salt = salt.toString(16);
  while(salt.length < 8)salt = "0" + salt;
  enc_str += salt;
  return enc_str;
}

function decrypt(str, pwd) {
  if(str == null || str.length < 8) {
    alert("Não foi possível desencriptar pois a mensagem e muito pequena os cálculos retornam um numero negativo.");
    return;
  }
  if(pwd == null || pwd.length <= 0) {
    alert("Por favor coloque a senha para desencriptar a mensagem.");
    return;
  }
  var prand = "";
  for(var i=0; i<pwd.length; i++) {
    prand += pwd.charCodeAt(i).toString();
  }
  var sPos = Math.floor(prand.length / 5);
  var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
  var incr = Math.round(pwd.length / 2);
  var modu = Math.pow(2, 31) - 1;
  var salt = parseInt(str.substring(str.length - 8, str.length), 16);
  str = str.substring(0, str.length - 8);
  prand += salt;
  while(prand.length > 10) {
    prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
  }
  prand = (mult * prand + incr) % modu;
  var enc_chr = "";
  var enc_str = "";
  for(var i=0; i<str.length; i+=2) {
    enc_chr = parseInt(parseInt(str.substring(i, i+2), 16) ^ Math.floor((prand / modu) * 255));
    enc_str += String.fromCharCode(enc_chr);
    prand = (mult * prand + incr) % modu;
  }
  return enc_str;
}
//  End -->
</script>

</HEAD>


<BODY>

<form name="box"><center>
  <p>Toda mensagem para ser criptografada deve ser colocada no primeiro campo, digite a senha entre os botoes e clique encrypt, a mensagem será encriptada no segundo campo copie e cole na pagina desejada.</p>
  <p>Para desencriptar, coloque a mensagem recebida no segundo campo e digite a senha recebida, clique decrypt no campo 1 ira aparecer a mensagem enviada... Caso esteja ilegível repita o processo prestando atenção na senha. </p>

  <table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3>
<textarea cols=40 rows=5 wrap=virtual name=ipt>COLOQUE SUA MENSAGEM AQUI</textarea>
</td></tr>
<tr height=50><td valign="top">
<input type="button" onClick="document.box.opt.value= encrypt(document.box.ipt.value, document.box.pwd.value);" value="Encrypt">
</td><td align="center" valign="center">
<input type="password" name="pwd" value="">
</td><td align="right" valign="bottom">
<input type="button" onClick="document.box.ipt.value= decrypt(document.box.opt.value, document.box.pwd.value);" value="Decrypt">
</td></tr>
<tr><td colspan=3>
<textarea cols=40 rows=5 wrap=virtual name=opt></textarea>
</td></tr></table>
</center>

</form>

</BODY></HTML>