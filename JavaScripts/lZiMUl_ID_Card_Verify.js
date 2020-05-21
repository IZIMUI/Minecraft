function lZiMUl_ID_Card_Verification(Number) {
            let Res = "";
            let Numbers = 0,
              IDX;
            const ArrExp = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            const ArrValid = new Array(1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2);

            function Is_Number(Number) {
              let Return;
              for (let Value = 0; Value < Number.length; Value++)
                if (new RegExp("[0-9]").test(Number[Value])) {
                  Return = true;
                } else {
                  Return = false;
                  break;
                }
              return Return;
            };
            if (Number)
              if (!(new RegExp("[{}\\[\\]\\()=;/!|&-+-<>*?]").test(Number)))
                if (!(new RegExp("[\\u4E00-\\u9FFF]+", "g").test(Number)))
                  if (!(new RegExp("[ABCDEFGHIJKLMNOPQRSTUVWYZ]").test(Number) || new RegExp("[abcdefghijklmnopqrstuvwxyz]").test(Number)))
                    if (Number.length >= 18)
                      if (Number.length <= 18)
                        if (Is_Number(Number.substring(0, 17)) == true) {
                          for (var Value = 0; Value < Number.length - 1; Value++)
                            Numbers += parseInt(Number.substr(Value, 1), 10) * ArrExp[Value];
                          IDX = Numbers % 11;
                          if ((ArrValid[IDX] == Number.substr(17, 2).toUpperCase()) == true)
                            return '{"Type": "Data", "Text": "校验通过", "Return": true}';
                          else
                            return '{"Type": "Caveat", "Text": "身份证不存在", "Return": false}';
                        } else
                          return '{"Type": "Caveat", "Text": "身份证格式错误", "Return": false}';
            else
              return '{"Type": "Caveat", "Text": "身份证长度过长", "Return": false}';
            else
              return '{"Type": "Caveat", "Text": "身份证长度过短", "Return": false}';
            else
              return '{"Type": "Caveat", "Text": "身份证不能有英文", "Return": false}';
            else
              return '{"Type": "Caveat", "Text": "身份证不能有中文", "Return": false}';
            else
              return '{"Type": "Caveat", "Text": "身份证不能有符号", "Return": false}';
            else
              return '{"Type": "Caveat", "Text": "请输入身份证", "Return": false}';
          };

          Callback(ID_Card_Verification(Options.Head.ID_Card))
          break;
