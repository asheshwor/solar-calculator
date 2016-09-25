<!--
//*	PLEASE DO NOT MODIFY THE COMMENT LINES
//* First version	: 6th August 2000
//* Last update		: 27nd September 2001
//* Twitter bootstrap styling: September 2016
//* This is a quite old script. Years ago, a handful of sites featured this code. At least one of them
//* 	is still operational and every year or so I receive an email regarding the page so I'm sharing the code
//* 	for those who are interested.
//*	Have fun
function resetForm()
{
document.solarCalc.reset();
document.getElementById("outputhtml").innerHTML = "Output will appear here.";
window.status=' * R E A D Y * ';
}
//global variables
var line="  _______________________________________________";
var c1=0;
var footer="";
monthName=new Array ("monthName","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
monthValue=new Array("monthValue", "0", "31", "59", "90", "120", "151", "181", "212", "243", "273", "304", "334");
//
function getMonthName()
{
varDay=document.solarCalc.day.options[document.solarCalc.day.selectedIndex].value*1;
varMonth=document.solarCalc.month.options[document.solarCalc.month.selectedIndex].value;
for (i in monthValue)
	{
	if (varMonth==monthValue[i])
		{
		textOut=monthName[i];
		break;
		}
	}
textOut=textOut+" "+varDay;
return textOut;
}
function getTimeText()
{
varHour=document.solarCalc.hour.options[document.solarCalc.hour.selectedIndex].value*1;
varMin=document.solarCalc.min.options[document.solarCalc.min.selectedIndex].value*1;
textOut=varHour+" : "+ varMin;
return textOut;
}
function getZoneText()
{
hour=solarCalc.tzHour.value;
min=solarCalc.tzMin.value;
if (hour<0)
	{
	hour=hour*-1;
	textOut=hour+" hour "+min+" minutes"+ " behind GMT";
	}
else
	{
	textOut=hour+" hour "+min+" minutes"+ " ahead of GMT";
	}
return textOut;
}
function add2table(col1, col2)
{
if (c1==0)
{
	color="#eceeef";
	c1=1;
}
else
{
	color="white";
	c1=0;
}
sumText="<tr bgcolor='"+color+"'><td>"+col1+": </td><td>"+col2+"</td></tr>";
return sumText;
}
function addIn(col1,col2,col3,col4,col5)
{
if (c1==0)
{
	color="#eceeef";
	c1=1;
}
else
{
	color="white";
	c1=0;
}
sumText="<tr align='center' bgcolor='"+color+"'><td>"+col1+"</td><td>"+col2+"</td><td>"+col3+"</td><td>"+col4+"</td><td>"+col5+"</td></tr>";
return sumText;
}
//Function to generate the HTML tables
function genTable()
{
window.status=" * W O R K I N G * ";
//alert("ams");
cor=getLocalCor();
rt=getSRT(getSRH())-cor;
st=getSST(getSRT(getSRH())) - cor;
//LOOP
html=" ";
html=html+"<h4>Solar calculations</h4>";
html=html+"<TABLE WIDTH=460 BORDER=1 CELLSPACING=0 CELLPADDING=2>";
html=html+add2table("Date",getMonthName());
html=html+add2table("Time zone",getZoneText());
html=html+add2table("Latitude",getLatText());
html=html+add2table("Longitude",getLongText());
html=html+add2table("Julian Date",getNDY());
html=html+add2table("Equation of Time",(getEQT(getNDY())+" minutes"));
html=html+add2table("Local correction",fix(getLocalCor()*60,2)+" minutes");
html=html+add2table("Declination of earth", fix(getDEC(),2)+"°");
html=html+add2table("Horizontal angles measured with", northType());
html=html+add2table("Magnetic Declination", magDecText());
html=html+add2table("Local Sunrise Time", breakTime(rt)+" hrs");
html=html+add2table("Sunrise Azimuth",fix(getAZI(getSRT(getSRH()))+getCorAng(),2)+"°");
html=html+add2table("Local Sunset Time", breakTime(st)+" hrs");
html=html+add2table("Sunset Azimuth", fix(getAZI(getSST(getSRT(getSRH())))+getCorAng(),2)+"°");
TST=getSST(getSRT(getSRH()))-getSRT(getSRH());
html=html+add2table("Total Sun Hours", breakHour(TST)+breakMinutes(TST));
html=html+add2table("Wall azimuth angle",document.solarCalc.wall.value*1);
html=html+add2table("Receiving plane", incText());
//html=html+;
rate=((document.solarCalc.sample.options[document.solarCalc.sample.selectedIndex].value*1)/60);
html=html+"</table>";
// now solar angles
if (solarCalc.htmlToo.checked)
{
	html=html+"<h4>Table of solar angles every "+fix(rate*60,0)+" minutes</h4>";
	html=html+"<TABLE WIDTH=460 BORDER=1 CELLSPACING=0 CELLPADDING=2>";
	html=html+addIn("<b>Time</b>","<b>Azimuth ( ° )</b>","<b>Altitude ( ° )</b>","<b>HSA ( ° )</b>","<b>VSA ( ° )</b>");
	//altitude filter
	lhr=Math.floor(rt);
	lmn=(rt-lhr)*60;
	lmn=fix(lmn,0);
	//PROCESS to nearest multiple of rate
	minInHour=lmn/60;
	a=minInHour/rate;
	b=Math.floor(a);
	d=b-a;
	t0=lhr+b*rate;
	for (var j=t0; j<=(st+rate); j=j+rate)
		{
		//lTime=j;
		y2=getALT(j+cor);
		//if ((y2>0)&&(y2<180))
		//	{
			y3=getAZI(j+cor);
			y4=getHSA(j+cor);
			y5=getVSA(j+cor);
			html=html+addIn(breakTime(j),fix(y3,1),fix(y2,1),fix(y4,1),fix(y5,1));
		//	}
		//html=html+addIn(y2,"b","c","d","e");
		}
	html=html+"</table>";
	html=html+footer;
	html=html+"</bodY></html>";
	//twin=window.open("","SolarWindow2","width=500,height=475,scrollbars=yes,resizable=yes,menubar=1,status=1");
	//twin.document.write(html);
	//twin.document.close();
}
//code to output in the same page
document.getElementById("outputhtml").innerHTML = html;
c1=0;
//alert(document.solarCalc.solution.value);
// if (document.solarCalc.solution.value=="The solution will appear in this area.")
// 	{
// 	document.solarCalc.solution.value="";
// 	AddText(line);
// 	AddText("      * Finished generating table in HTML *");
// 	AddText(line);
// 	}
window.status=" * F I N I S H E D *  AND  * R E A D Y *";
}
function AddText(mes)
//*this adds the output text to the textarea box
{
var AddTxt="";
{
AddTxt=mes+"\r\n";
document.solarCalc.solution.value+=AddTxt;
}
}
function addLeader(num)
{
num=Math.abs(num);
if (num<10)
	{
	num="0"+num;
	}
return num;
}
function fix(number, p)
//*this fixes the decimal places
{
var f=1;
var g=1;
while (f<=p)
	{
	g=g*10;
	f++;
	}
number=number*(g);
number=Math.round(number);
number=number/(g);
return number;
}
function breakTime(tim)
//*	this breaks decimal time to hour and minute values
{
var timeText="00:00";
var hr=0;
var mn=0;
hr=Math.floor(tim);
mn=(tim-hr)*60;
mn=fix(mn,0);
if (mn==60)
	{
	mn=0;
	hr=hr+1;
	}

timeText=addLeader(hr)+" : "+addLeader(mn);
return timeText;
}
function breakHour(tim)
//*this extracts hour from the decimal time
{
var timeText="00:00";
var hr=0;
hr=Math.floor(tim);
timeText=hr+" hours and ";
return timeText;
}
function breakMinutes(tim)
//*this extracts minutes from the decimal time
{
var timeText="00:00";
var hr=0;
var mn=0;
hr=Math.floor(tim);
mn=(tim-hr)*60;
mn=fix(mn,0);
timeText=mn+" minutes";
return timeText;
}
//approximation of EQUATION OF TIME(table source: various books)
function getEQT(JD)
	{
	eqtData=new Array ("0", "-3.4", "-3.9", "-4.3", "-4.8", "-5.2", "-5.7", "-6.1",
"-6.5", "-6.9", "-7.4", "-7.8", "-8.1", "-8.5", "-8.9", "-9.3", "-9.6", "-9.9", "-10.3", "-10.6", "-10.9", "-11.2",
"-11.5", "-11.7", "-12.0", "-12.2", "-12.4", "-12.7", "-12.9", "-13.0", "-13.2", "-13.4", "-13.5", "-13.6",
"-13.8", "-13.9", "-14.0", "-14.0", "-14.1", "-14.1",
"-14.2", "-14.2", "-14.2", "-14.2", "-14.2", "-14.2",
"-14.1", "-14.1", "-14.0", "-13.9", "-13.8", "-13.7",
"-13.6", "-13.5", "-13.4", "-13.2", "-13.1", "-12.9",
"-12.7", "-12.5", "-12.4", "-12.2", "-12.0", "-11.7",
"-11.5", "-11.3", "-11.0", "-10.8", "-10.6", "-10.3",
"-10.0", "-9.8", "-9.5", "-9.2", "-8.9", "-8.7", "-8.4",
"-8.1", "-7.8", "-7.5", "-7.2", "-6.9", "-6.6", "-6.3",
"-6.0", "-5.7", "-5.4", "-5.1", "-4.8", "-4.5", "-4.2",
"-3.9", "-3.6", "-3.3", "-3.0", "-2.7", "-2.4", "-2.1",
"-1.9", "-1.6", "-1.3", "-1.1", "-0.8", "-0.5", "-0.3",
"0.0", "0.2", "0.4", "0.7", "0.9", "1.1", "1.3", "1.5",
"1.7", "1.9", "2.1", "2.2", "2.4", "2.5", "2.7", "2.8",
"3.0", "3.1", "3.2", "3.3", "3.4", "3.4", "3.5", "3.6",
"3.6", "3.7", "3.7", "3.7", "3.8", "3.8", "3.8", "3.7",
"3.7", "3.7", "3.6", "3.6", "3.5", "3.5", "3.4", "3.3",
"3.2", "3.1", "3.0", "2.9", "2.8", "2.6", "2.5", "2.3",
"2.2", "2.0", "1.9", "1.7", "1.5", "1.3", "1.1", "0.9",
"0.8", "0.6", "0.3", "0.1", "-0.1", "-0.3", "-0.5", "-0.7",
"-0.9", "-1.1", "-1.4", "-1.6", "-1.8", "-2.0", "-2.2",
"-2.4", "-2.6", "-2.9", "-3.1", "-3.3", "-3.5",
"-3.7", "-3.9", "-4.0", "-4.2", "-4.4", "-4.6",
"-4.7", "-4.9", "-5.1", "-5.2", "-5.3", "-5.5",
"-5.6", "-5.7", "-5.8", "-5.9", "-6.0", "-6.1",
"-6.2", "-6.2", "-6.3", "-6.3", "-6.4", "-6.4",
"-6.4", "-6.4", "-6.4", "-6.4", "-6.4", "-6.3",
"-6.3", "-6.2", "-6.2", "-6.1", "-6.0", "-5.9", "-5.8",
"-5.7", "-5.6", "-5.4", "-5.3", "-5.1", "-5.0", "-4.8",
"-4.6", "-4.4", "-4.2", "-4.0", "-3.8", "-3.6", "-3.3",
"-3.1", "-2.8", "-2.6", "-2.3", "-2.1", "-1.8", "-1.5",
"-1.2", "-0.9", "-0.6", "-0.3", "0.0", "0.3", "0.7",
"1.0", "1.3", "1.7", "2.0", "2.3", "2.7", "3.0", "3.4",
"3.7", "4.1", "4.4", "4.8", "5.2", "5.5", "5.9", "6.2",
"6.6", "6.9", "7.3", "7.6", "8.0", "8.3", "8.7", "9.0",
"9.4", "9.7", "10.0", "10.3", "10.7", "11.0", "11.3",
"11.6", "11.9", "12.2", "12.5", "12.8", "13.0", "13.3",
"13.5", "13.8", "14.0", "14.3", "14.5", "14.7", "14.9",
"15.1", "15.3", "15.4", "15.6", "15.7", "15.9", "16.0",
"16.2", "16.3", "16.4", "16.4", "16.5", "16.5", "16.5", "16.5", "16.5", "16.5", "16.5", "16.5", "16.4", "16.3",
"16.3", "16.2", "16.1", "16.0", "15.8", "15.7", "15.5",
"15.3", "15.1", "14.9", "14.7", "14.5", "14.2", "14.0",
"13.7", "13.4", "13.1", "12.8", "12.5", "12.2", "11.8",
"11.5", "11.1", "10.7", "10.3", "9.9", "9.5", "9.1",
"8.7", "8.2", "7.8", "7.4", "6.9", "6.4", "6.0", "5.5",
"5.0", "4.5", "4.1", "3.6", "3.1", "2.6", "2.1", "1.6",
"1.1", "0.6", "0.1", "-0.4", "-0.9", "-1.3", "-1.8",
"-2.3", "-2.8")
b=eqtData[JD];
	c=fix(b,2);
	return c;
	}
function getLatText()
{
lat=document.solarCalc.latBox.value*1;
if (document.solarCalc.northSouth[1].checked)
	{
	dc="South";
	}
else
	{
	dc="North";
	}
return lat+" ° "+dc;
}
function getLongText()
{
lon=document.solarCalc.longBox.value*1;
if (document.solarCalc.eastWest[1].checked)
	{
	dc="West";
	}
else
	{
	dc="East";
	}
return lon+" ° "+dc;
}
function northType()
{
if (document.solarCalc.outAng[1].checked)
	{
	out="Magnetic North";
	}
else
	{
	out="True North";
	}
return out;
}
function magDecText()
{
tex=document.solarCalc.mDec.value*1;
if (document.solarCalc.decEastWest[1].checked)
	{
	dc="West";
	}
else
	{
	dc="East";
	}
return tex+" ° "+dc;
}
function incText()
{
tex=document.solarCalc.inc.value*1;
typ=tex+"° with horizon"
if (tex=="90")
	{
	typ="Vertical";
	}
if (tex=="0")
	{
	typ="Horizontal";
	}
return typ;
}
function isShade(val)
//*this checks if the wall is in shade so no shadow is cast on it
{
var output=" ";
var HSA=val;
if ((val<270)&&(val>90))
	{
	HSA=HSA+corAng;
	output=fix(HSA,1)+"°, * Wall in Shade *";
	}
else
	{
	HSA=HSA+corAng;
	output=fix(HSA,1)+"°";
	}
	return output;
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function getRlong()
{
//function to get the reference longitude from time zone
	tzHour=document.solarCalc.tzHour.options[document.solarCalc.tzHour.selectedIndex].value*1;

	if (tzHour<0)
		{
		sign=-1;
		}
	else
		{
		sign=1;
		}
	tzMin=sign*(document.solarCalc.tzMin.options[document.solarCalc.tzMin.selectedIndex].value*1);
	tzTotalMin=(tzHour*60+tzMin);
	tzDeg=tzTotalMin/4;
	return tzDeg;
}
function getLong()
{
	//function for extracting the longitude
	long=document.solarCalc.longBox.value;
	if (document.solarCalc.eastWest[0].checked)
		{
		sign=1;
		}
	else
		{
		sign=-1;
		}
	long=long*sign;
	return long;
}
//function to extract magnetic declination
function getMagDec()
	{
	if (document.solarCalc.trueMag[1].checked)
		{
		magDec=document.solarCalc.mDec.value;
		if (document.solarCalc.decEastWest[1].checked)
			{
			sign=-1;
			}
		else
			{
			sign=1;
			}
		magDec=magDec*sign;
		}
	else
		{
		magDec=0*1;
		}
	return magDec;
	}
//function to get time zone correction
function dT()
	{
	d = (getRlong()-getLong())*(-4);
	return d;
	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getNDY()
{
//*NDY
varDay=document.solarCalc.day.options[document.solarCalc.day.selectedIndex].value*1;
varMonth=document.solarCalc.month.options[document.solarCalc.month.selectedIndex].value*1;
NDY=varDay+varMonth;
return NDY;
}
function getVarTime(hr,min)
{
varTime=hr+(min/60);
varTime=varTime+getLocalCor();
return varTime;
}
function getLocalCor()
{
localCor=getEQT(getNDY())+dT();
localCor=localCor/60;
return localCor;
}
function getHRA(time)
{
HRA=15*(time-12);
return HRA;
}
function getDEC()
{
DEC=23.45*((Math.sin(((360/365)*(284+getNDY()))*Math.PI/180)));
return DEC;
}
function getLAT()
{
varLat=document.solarCalc.latBox.value;
if (document.solarCalc.northSouth[1].checked)
	{
	LAT=varLat*(-1);
	}
else {LAT=varLat;
	}
return LAT;
}
function getALT(time)
{
ALT=Math.asin((Math.sin((Math.PI/180)*getDEC())*Math.sin((Math.PI/180)*getLAT())+Math.cos((Math.PI/180)*getDEC())*Math.cos((Math.PI/180)*getLAT())*Math.cos((Math.PI/180)*getHRA(time))));
ALT=(ALT*180/Math.PI);
return ALT;
}
function getAZI(time)
{
AZI=Math.acos(((Math.cos((Math.PI/180)*getLAT())*Math.sin((Math.PI/180)*getDEC()))-(Math.cos((Math.PI/180)*getDEC())*Math.sin((Math.PI/180)*getLAT())*Math.cos((Math.PI/180)*getHRA(time))))/(Math.cos((Math.PI/180)*getALT(time))))
AZI=(AZI*180/Math.PI);
//*	CHECKING IF NOON OR NOT
if (time>12)
	{
	AZI=360-AZI*1;
	}
else {AZI=AZI*1;}
return AZI;
}
function getSRH()
{
SRH=Math.acos(-1*Math.tan((Math.PI/180)*getDEC())*Math.tan((Math.PI/180)*getLAT()));
SRH=SRH*180/Math.PI;
return SRH;
}
function getSRT(riseHour)
{
SRT=12-(riseHour)/15;
return SRT;
}
function getSST(riseTime)
{
noonDifference=12-riseTime;
SST=noonDifference+12;
return SST;
}
function getSRA()
{
SRA=Math.acos(Math.cos((Math.PI/180)*getLAT())*Math.sin((Math.PI/180)*getDEC())+Math.tan((Math.PI/180)*getLAT())*Math.tan((Math.PI/180)*getDEC())*Math.sin((Math.PI/180)*getLAT())*Math.cos((Math.PI/180)*getDEC()));
SRA=SRA*180/Math.PI;
return SRA;
}
function getWall()
{
WALL=document.solarCalc.wall.value*1;
trueWALL=WALL+getMagDec()*1;
return trueWALL;
}
function getHSA(time)
{
HSA=Math.abs(getAZI(time)-getWall());
return HSA;
}
function getVSA(time)
{
VSA=Math.atan(Math.tan((Math.PI/180)*getALT(time))/(Math.cos((Math.PI/180)*getHSA(time))));
VSA=VSA*180/Math.PI;
return VSA;
}
function getCorAng()
{
//correction for angle output (for magnetic bearings)
if (document.solarCalc.outAng[1].checked)
	{
	corAng=-1*getMagDec();
	}
else
	{
	corAng=0;
		}
return corAng;
}
function getWall2()
{
//needs opposite algorithm for wall e.g. WALL=WALL+corAng; will not work
if (document.solarCalc.outAng[1].checked)
	{
	trueWALL=trueWALL+getCorAng();
	}
else
	{
	trueWALL=trueWALL*1;
		}
return trueWALL;
}
//-->
