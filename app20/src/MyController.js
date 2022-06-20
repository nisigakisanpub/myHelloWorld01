import React, { useState, useRef } from "react";
import ComboBox from "./ComboBox";

const EnqueteResultList = [
  {
    enqueteId: "1",
    enqueteTitle: "会社説明会（7月）",
    questions: [
      {
        questionId: "1",
        questionText: "得意なプログラム言語は？",
        answerCount: 15
      },
      {
        questionId: "2",
        questionText: "興味のある職種は？",
        answerCount: 12
      }
    ]
  },
  {
    enqueteId: "2",
    enqueteTitle: "会社説明会（8月）",
    questions: [
      {
        questionId: "1",
        questionText: "興味のある職種は？",
        answerCount: 23
      },
      {
        questionId: "2",
        questionText: "弊社の求人をどこで知りましたか？",
        answerCount: 24
      }
    ]
  },
  {
    enqueteId: "3",
    enqueteTitle: "DevelopersIOイベント",
    questions: [
      {
        questionId: "1",
        questionText: "今回のイベントをどこで知りましたか？",
        answerCount: 40
      },
      {
        questionId: "2",
        questionText: "興味のある職種は？",
        answerCount: 37
      },
      {
        questionId: "3",
        questionText: "得意なプログラム言語は？",
        answerCount: 29
      }
    ]
  }
];

const MyController = () => {
  //ComboBoxのアイテムとするアンケート一覧をStateで管理
  const [enqueteOptions] = useState(
    EnqueteResultList.map((d) => {
      return {
        id: d.enqueteId,
        value: d.enqueteTitle
      };
    })
  );
  //アンケートComboBoxで選択中のアンケートIDをStateで管理
  const [selectedEnqueteId, setSelectedEnqueteId] = useState(
    EnqueteResultList[0].enqueteId
  );
  //選択中のアンケートの質問一覧をRefで管理
  const questionOptionsRef = useRef(
    EnqueteResultList.filter(
      (d) => d.enqueteId === selectedEnqueteId
    )[0].questions.map((d) => {
      return {
        id: d.questionId,
        value: d.questionText
      };
    })
  );
  //質問ComboBoxで選択中の質問IDをStateで管理
  const [selectedQuestionId, setSelectedQuestionId] = useState(
    EnqueteResultList[0].questions[0].questionId
  );

  const onEnqueteComboBoxChangeHandler = (enqueteId: string) => {
    //選択したアンケートIDをStateに指定
    setSelectedEnqueteId(enqueteId);

    //選択したアンケートの質問一覧
    const selectedEnqueteQuestions = EnqueteResultList.filter(
      (d) => d.enqueteId === enqueteId
    )[0].questions;

    //選択したアンケートの先頭の質問をStateに指定
    setSelectedQuestionId(selectedEnqueteQuestions[0].questionId);

    //選択したアンケートの質問をRefに指定
    questionOptionsRef.current = selectedEnqueteQuestions.map((d) => {
      return {
        id: d.questionId,
        value: d.questionText
      };
    });
  };

  return (
    <>
      <ComboBox
        inputLabel="アンケート"
        items={enqueteOptions}
        value={selectedEnqueteId}
        defaultValue={enqueteOptions[0].id}
        onChange={(selected) => onEnqueteComboBoxChangeHandler(selected)}
      />
      <ComboBox
        inputLabel="質問"
        items={questionOptionsRef.current}
        value={selectedQuestionId}
        defaultValue={"1"}
        onChange={(selected) => setSelectedQuestionId(selected)}
      />
      <div style={{ marginTop: 50, marginLeft: 15 }}>
        この質問へは{" "}
        {
          EnqueteResultList.filter(
            (d) => d.enqueteId === selectedEnqueteId
          )[0].questions.filter((d) => d.questionId === selectedQuestionId)[0]
            .answerCount
        }{" "}
        の回答がありました。
      </div>
    </>
  );
};

export default MyController;
