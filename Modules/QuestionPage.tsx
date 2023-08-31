import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  RadioGroup,
  styled,
  Typography,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { getFormattedOptions, Questions, QuestionType } from "./helpers";
import XAPI, { Statement } from "@xapi/xapi";

const QuestionPage = () => {
  const endpoint = "https://cloud.scorm.com/lrs/0U5EYOHBPW/sandbox/";
  const username = "z3AbHuFXYlVrHA0ABHc" || "";
  const password = "xKCSe18Ea38Oq5AO80M" || "";
  const auth = XAPI.toBasicAuth(username, password);
  const xapi = new XAPI({
    endpoint: endpoint,
    auth: auth,
  });
  console.log("auth", auth);

  const myStatement: Statement = {
    actor: {
      objectType: "Agent",
      name: "sajeda",
      mbox: "mailto:sajeda@example.com",
    },
    verb: {
      id: "http://example.com/verbs/tested",
      display: {
        "en-GB": "clicked",
      },
    },
    object: {
      objectType: "Activity",
      id: "https://github.com/xapijs/xapi",
      /*definition: {
        name: {
          "en-US": "option 1",
        },
        description: {
          "en-US": "option 1",
        },
      },*/
    },
  };

  const handleOption = () => {
    console.log("gf");
    xapi.sendStatement({
      statement: myStatement,
    });
  };

  const { register, control, handleSubmit } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log("data-->", data);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "60vw",
      }}
    >
      <Grid item xs={12} sx={{ marginBottom: "30px" }}>
        <Typography variant={"h4"}>
          Pick the right answers from the questions below and then hit submit
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {Questions &&
            Questions.map((moduleQuestion: any, index: number) => {
              return (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ marginBottom: "12px" }}>
                      <Typography
                        variant={"body1"}
                        sx={{ fontWeight: "600", color: "#7A5AF8" }}
                      >
                        Question {index + 1}:{" "}
                        <span style={{ fontWeight: "400", color: "#000000" }}>
                          {moduleQuestion?.question}
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "30px" }}>
                      {moduleQuestion?.question_type === QuestionType.MAQ && (
                        <Box>
                          <Controller
                            name={`${moduleQuestion?.id}`}
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                              <Box>
                                <FormGroup>
                                  {getFormattedOptions(moduleQuestion).map(
                                    (option: any) => (
                                      <FormControlLabel
                                        key={option.id}
                                        control={
                                          <Checkbox
                                            {...register(moduleQuestion.id)}
                                            onClick={handleOption}
                                            value={option.answer}
                                            sx={{
                                              "&.MuiCheckbox-root": {
                                                padding: "9px 9px 9px 12px",
                                              },
                                              "&.Mui-checked": {
                                                color: "#7A5AF8",
                                                "& .MuiSvgIcon-root": {
                                                  fill: "white",
                                                  backgroundColor: "#7A5AF8",
                                                  fontSize: 16,
                                                  boxShadow:
                                                    "0 0 0 1px #7A5AF8 inset, 0 0 0 3px #fff inset",
                                                },
                                              },
                                              "& .MuiSvgIcon-root": {
                                                fontSize: 16,
                                                fill: "white",
                                                borderRadius: "4px",
                                                backgroundColor: "#fff",
                                                boxShadow:
                                                  "0 0 0 1px #7A5AF8 inset",
                                              },
                                            }}
                                          />
                                        }
                                        label={option.label}
                                      />
                                    ),
                                  )}
                                </FormGroup>
                              </Box>
                            )}
                          />
                        </Box>
                      )}
                      {moduleQuestion?.question_type === QuestionType.MCQ && (
                        <Controller
                          name={`${moduleQuestion?.id}`}
                          control={control}
                          defaultValue={""}
                          render={({ field }) => (
                            <Box>
                              <RadioGroup {...field}>
                                {getFormattedOptions(moduleQuestion).map(
                                  (option: any) => (
                                    <FormControlLabel
                                      key={option.id}
                                      value={option.answer}
                                      control={
                                        <Radio
                                          sx={{
                                            "&.MuiRadio-root": {
                                              padding: "9px 9px 9px 12px",
                                            },
                                          }}
                                          icon={<CheckBoxOutlineBlankIcon />}
                                          checkedIcon={<CheckBoxIcon />}
                                        />
                                      }
                                      label={
                                        <Typography
                                          variant={"body1"}
                                          sx={{ color: "#000000" }}
                                        >
                                          {option?.label}
                                        </Typography>
                                      }
                                    />
                                  ),
                                )}
                              </RadioGroup>
                            </Box>
                          )}
                        />
                      )}
                      {moduleQuestion?.question_type ===
                        QuestionType.YES_NO && (
                        <Controller
                          name={`${moduleQuestion?.id}`}
                          control={control}
                          defaultValue={""}
                          render={({ field }) => (
                            <Box>
                              <RadioGroup {...field}>
                                {getFormattedOptions(moduleQuestion).map(
                                  (option: any) => (
                                    <FormControlLabel
                                      key={option.id}
                                      value={option.answer}
                                      control={
                                        <Radio
                                          sx={{
                                            "&.MuiRadio-root": {
                                              padding: "9px 9px 9px 12px",
                                            },
                                          }}
                                        />
                                      }
                                      label={option.label}
                                    />
                                  ),
                                )}
                              </RadioGroup>
                            </Box>
                          )}
                        />
                      )}

                      {moduleQuestion?.question_type ==
                        QuestionType.FILL_IN_THE_BLANK && (
                        <Box sx={{ marginTop: "6px" }}>
                          <TextField
                            {...register(moduleQuestion.id)}
                            sx={{ width: "312px", borderRadius: "10px" }}
                            placeholder="type your answer here"
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </>
              );
            })}

          <Box
            sx={{
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              type={"submit"}
              sx={{
                height: "36px",
                width: "108px",
                borderRadius: "5px",
                marginRight: "15px",
                background: "#e4e5e5",
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};
export default QuestionPage;
