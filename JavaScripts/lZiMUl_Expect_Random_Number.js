const lZiMUl_Expect_Random_Number = function(Mix, Max, Expect){
var Res = {
"Array": [],
"Frequency" : 0
}
if(Expect)
while(true){
const Random_Number = Math.floor(Math.random() * ((Max - Mix) + 1) + Mix);
if(Random_Number == Expect)
return Res;
else 
Res.Array.push(Random_Number);
Res.Frequency++;
} else 
return Math.floor(Math.random() * ((Max - Mix) + 1) + Mix);
};
