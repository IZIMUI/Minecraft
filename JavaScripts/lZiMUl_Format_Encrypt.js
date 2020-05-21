const Encoding_lZiMUl_List = new Array({
    "Text": "A",
    "Encoding": "AZMAZZ"
  }, {
    "Text": "a",
    "Encoding": "ZZAMZA"
  }, {
    "Text": "B",
    "Encoding": "ZYMZZY"
  }, {
    "Text": "b",
    "Encoding": "YZZMYZ"
  }, {
    "Text": "C",
    "Encoding": "YXMYZX"
  }, {
    "Text": "c",
    "Encoding": "XZYMXY"
  }, {
    "Text": "D",
    "Encoding": "XWMXZW"
  }, {
    "Text": "d",
    "Encoding": "WZXMWX"
  }, {
    "Text": "E",
    "Encoding": "WVMWZV"
  }, {
    "Text": "e",
    "Encoding": "VZWMVW"
  }, {
    "Text": "F",
    "Encoding": "VUMVZU"
  }, {
    "Text": "f",
    "Encoding": "UZVMUV"
  }, {
    "Text": "G",
    "Encoding": "UTMUZT"
  }, {
    "Text": "g",
    "Encoding": "TZUMTU"
  }, {
    "Text": "H",
    "Encoding": "TSMTZS"
  }, {
    "Text": "h",
    "Encoding": "SZTMST"
  }, {
    "Text": "I",
    "Encoding": "SRMSZR"
  }, {
    "Text": "i",
    "Encoding": "RZSMRS"
  }, {
    "Text": "J",
    "Encoding": "RQMRZQ"
  }, {
    "Text": "j",
    "Encoding": "QZRMQR"
  }, {
    "Text": "K",
    "Encoding": "QMPQZP"
  }, {
    "Text": "k",
    "Encoding": "PZQMPQ"
  }, {
    "Text": "L",
    "Encoding": "POMPZO"
  }, {
    "Text": "l",
    "Encoding": "OZPMOP"
  }, {
    "Text": "M",
    "Encoding": "ONMOZN"
  }, {
    "Text": "m",
    "Encoding": "NZOMNO"
  }, {
    "Text": "N",
    "Encoding": "NMMNZM"
  }, {
    "Text": "n",
    "Encoding": "MZNMMN"
  }, {
    "Text": "O",
    "Encoding": "MLMMZL"
  }, {
    "Text": "o",
    "Encoding": "LZMMLM"
  }, {
    "Text": "P",
    "Encoding": "LKMLZK"
  }, {
    "Text": "p",
    "Encoding": "KZLMKL"
  }, {
    "Text": "Q",
    "Encoding": "KJMKZJ"
  }, {
    "Text": "q",
    "Encoding": "JZKMJK"
  }, {
    "Text": "R",
    "Encoding": "JIMJZI"
  }, {
    "Text": "r",
    "Encoding": "IZJMIJ"
  }, {
    "Text": "S",
    "Encoding": "IHMIZH"
  }, {
    "Text": "s",
    "Encoding": "HZIMHI"
  }, {
    "Text": "T",
    "Encoding": "HGMHZG"
  }, {
    "Text": "t",
    "Encoding": "GZHMGH"
  }, {
    "Text": "U",
    "Encoding": "GFMGZF"
  }, {
    "Text": "u",
    "Encoding": "FZGMFG"
  }, {
    "Text": "V",
    "Encoding": "FEMFZE"
  }, {
    "Text": "v",
    "Encoding": "EZFMEF"
  }, {
    "Text": "W",
    "Encoding": "EDMEZD"
  }, {
    "Text": "w",
    "Encoding": "DZEMDE"
  }, {
    "Text": "X",
    "Encoding": "DCMDZC"
  }, {
    "Text": "x",
    "Encoding": "CZDMCD"
  }, {
    "Text": "Y",
    "Encoding": "CBMCZB"
  }, {
    "Text": "y",
    "Encoding": "BZCMBC"
  }, {
    "Text": "Z",
    "Encoding": "BAMBZA"
  }, {
    "Text": "z",
    "Encoding": "AZBMAB"
  }, {
    "Text": "0",
    "Encoding": "AAAAAA"
  }, {
    "Text": "1",
    "Encoding": "BBBBBB"
  }, {
    "Text": "2",
    "Encoding": "AABBAA"
  }, {
    "Text": "3",
    "Encoding": "BBAABB"
  }, {
    "Text": "4",
    "Encoding": "AABBBB"
  }, {
    "Text": "5",
    "Encoding": "BBAAAA"
  }, {
    "Text": "6",
    "Encoding": "AAAABB"
  }, {
    "Text": "7",
    "Encoding": "BBBBAA"
  }, {
    "Text": "8",
    "Encoding": "ABABAB"
  }, {
    "Text": "9",
    "Encoding": "BABABA"
  });
  
  const Encode_lZiMUl = function(Data, Callback) {
    function Encode(Str) {
    let Res = [];
    let Search_Value;
    let Language;

    function Encoding_Library(Str) {
      if (new RegExp("[A-Za-z]+").test(Str)) {
        for (let Value = 0; Value < Encoding_lZiMUl_List.length; Value++)
          if (Str == Encoding_lZiMUl_List[Value].Text) {
            Search_Value = Value;
            Language = "String";
            return true;
          };
          
       } else if (new RegExp("[0-9]+").test(Str)) {
        for (let Value = 0; Value < Encoding_lZiMUl_List.length; Value++)
          if (Str == Encoding_lZiMUl_List[Value].Text) {
            Search_Value = Value;
            Language = "Number";
            return true;
          };
          
       } else if (Str == " ") {
        Language = "lZiMUl";
        return true;
      }
   };

    for (let Value = 0; Value < Str.length; Value++)
      if (Encoding_Library(Str[Value]) == true) {
        if (Language == "String") 
          Res[Value] = Encoding_lZiMUl_List[Search_Value].Encoding;
        else if (Language == "Number") 
          Res[Value] = Encoding_lZiMUl_List[Search_Value].Encoding;
        else if (Language == "lZiMUl") 
          Res[Value] = "lZiMUl";
        };
    return "[" + Res.join("] [") + "]"
  };


  function Hex_Encode(Str) {
    var Res = [];
    var Str = String(Str).split(" ");
    for (let Value = 0; Value < Str.length; Value++) {
      if (!(Value == 0))
        Res.push(" ");
      Res.push(parseInt(Str[Value], 2).toString(34));
    };
    return Encode(Res.join(""));
  };

  var Res = [];
  var Str = String(Data).split("");
  for (let Value = 0; Value < Str.length; Value++) {
    if (!(Value == 0))
      Res.push(" ");
    Res.push(Str[Value].charCodeAt().toString(2));
  };
  Callback(Hex_Encode(Res.join("")));
};


const Decode_lZiMUl = function(Data, Callback) {
  function Binary_Decode(Str) {
    var Res = [];
    var Str = String(Str).split(" ");
    for (let Value = 0; Value < Str.length; Value++)
      Res.push(String.fromCharCode(parseInt(Str[Value], 2)));
    return Res.join("");
  };

  function Hex_Decode(Str) {
    var Res = [];
    var Str = String(Str).split(" ");
    for (let Value = 0; Value < Str.length; Value++) {
      if (!(Value == 0))
        Res.push(" ");
      Res.push(parseInt(Str[Value], 34).toString(2));
    }
    return Binary_Decode(Res.join(""));
  };

  let Res = new Array();
  let Search_Value;
  let StrRes = [];

  function Encoding_Library(Str) {
    for (let Value = 0; Value < Encoding_lZiMUl_List.length; Value++)
      if (Str == Encoding_lZiMUl_List[Value].Encoding) {
        Search_Value = Value;
        return true;
      };
  };

  let Values = 1;
  for (let Value = 0; Value < Data.length; Value++) {
    Res.push(Data.substring(Values, Values + 6));
    Values += 9;
  };
  for (let Value = 0; Value < Res.length; Value++)
    if (Res[Value] == "" || typeof(Res[Value]) == "undefined") {
      Res.splice(Value, 1);
      Value--;
    };

  for (let Value = 0; Value < Res.length; Value++){
      if (Encoding_Library(Res[Value]) == true) 
      StrRes += Encoding_lZiMUl_List[Search_Value].Text;
      else if (Res[Value].substring(0, 8) == "lZiMUl")
      StrRes += " ";
  };
  return Callback(Hex_Decode(StrRes));
};
