
function GetTollName()
{

    $("#TxtSearch").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "https://tis.nhai.gov.in/TollPlazaService.asmx/AutoCompleteLocation",
                data: "{'location':'" + document.getElementById('TxtSearch').value + "'}",
                dataType: "json",
                success: function(data) {
                 response(data.d);
                },
                error: function(result) {
                    alert("Error");
                }
            });
        }
  });
}
function GetTollInfo()
{
$.ajax({
type: "POST",
contentType: "application/json; charset=utf-8",
url: "https://tis.nhai.gov.in/TollPlazaService.asmx/GetTollPlazaInfoGrid",
data: "{'TollName':'" + document.getElementById('TxtSearch').value + "'}",
success: function(data) {
document.getElementById("tollList").innerHTML=data.d;

},
error: function(result) {
    alert("Please Enter valid Plaza name/location");
}
});
}
function GetTollInfoWidth()
{
GetTollInfo();
$.ajax({
type: "POST",
contentType: "application/json; charset=utf-8",
url: "https://tis.nhai.gov.in/TollPlazaService.asmx/CheckCapthcha",
data: "{'text':'" + document.getElementById('txtCapchatext').value + "'}",
success: function(data) {
//  if(data)
//  {

// Refreshcaptcha();
// }
//  else {alert("Please Enter correct image text");}
},
error: function(result) {

}
});
}


function Refreshcaptcha()
{
$.ajax({
url: "https://tis.nhai.gov.in/GenrateCaptcha.ashx",
data: {  },
type: 'POST',
success: function(data){

//document.getElementById("img").src="";
  document.getElementById("img").src =data.d;
  //document.getElementById("txtCapchatext").value="";

},
complete: null,
error: function(data){},
timeout: 1500000 });
}
function tbx_fnAlphaNumericOnly(e, ctrl)
{   //.:46, >:62, ,:44,

if (!e) e=window.event;


if (e.charCode)
{
if ((e.charCode<38 || (e.charCode>57 && e.charCode<65) || (e.charCode>90 && e.charCode<97) || e.charCode>122) && e.charCode!=95 && e.charCode!=32)
{
if(e.preventDefault)
{
    e.preventDefault();
}
}
}
else if (e.keyCode)
{
if ((e.keyCode<38 || (e.keyCode>57 && e.keyCode<65) || (e.keyCode>90 && e.keyCode<97) || e.keyCode>122) && e.keyCode!=95 && e.keyCode!=32)
{
try
{
    e.keyCode=0;
}
catch(e)
{}
}
}

}

function GetTollName()
{

$("#TxtSearch").autocomplete({
    source: function(request, response) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "https://tis.nhai.gov.in/TollPlazaService.asmx/AutoCompleteLocationAtGlance",
            data: "{'location':'" + document.getElementById('TxtSearch').value + "'}",
            dataType: "json",
            success: function(data) {

            response(data.d);
            },
            error: function(result) {
                alert("Error");
            }
        });
    }
});
}

function GenratePDF()
{
$.ajax({
type: "POST",
contentType: "application/json; charset=utf-8",
url: "TollPlazaService.asmx/GenratePDF",
data: "{'HTML':'" + document.getElementById("tollList").innerHTML + "'}",
dataType: "json",
success: function(data) {
//document.getElementById("tollList").innerHTML=data;
},
error: function(result) {
    alert("Error");
}
});
}
function closeMessagesDiv()
{
document.getElementById("Messages").style.display='none';
document.getElementById("fadeDiv").style.display='none';
}
function TollPlazaPopup(obj)
{
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
//alert('mobile se');
$.ajax({
type: "POST",
contentType: "application/json; charset=utf-8",
url: "https://tis.nhai.gov.in/TollPlazaService.asmx/GetTollPlazaByIdAtGlance",
data: "{'TollId':'" + obj + "'}",
dataType: "json",
success: function(data) {
document.getElementById("popup").innerHTML=data.d;
document.getElementById("Messages").style.display='block';
document.getElementById("fadeDiv").style.display='block';
},
error: function(result) {
    alert("Error");
}
});
}
else {
    //alert('callled by PC');
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "https://tis.nhai.gov.in/TollPlazaService.asmx/GetTollPlazaByIdForPc",
        //url: "/TollPlazaService.asmx/GetTollPlazaById",
        data: "{'TollId':'" + obj + "'}",
        dataType: "json",
        success: function (data) {
            document.getElementById("popup").innerHTML = data.d;
            document.getElementById("Messages").style.display = 'block';
            document.getElementById("fadeDiv").style.display = 'block';
        },
        error: function (result) {
            alert("Error");
        }
    });
}
}
$( document ).ready(function() {

$('#TxtSearch').bind('copy paste cut',function(e) {
e.preventDefault(); //disable cut,copy,paste
//alert('cut,copy & paste options are disabled !!');
});
 $('#txtCapchatext').bind('copy paste cut',function(e) {
e.preventDefault(); //disable cut,copy,paste
//alert('cut,copy & paste options are disabled !!');
});
GetTollInfo();
Refreshcaptcha();
});