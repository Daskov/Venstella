import s from "./answerItem.module.scss";

const AnswerItem = ({index, showAnswer, activeQuestion, question, answer}) => {

    const onShowAnswer = (index) => {
        activeQuestion === index? showAnswer(null) : showAnswer(index)
    }

    return (
        <div className={`${s.item} ${activeQuestion === index? s.active: ''}`}>
            <h3 onClick={() => onShowAnswer(index)} className={s.question}>{question}</h3>
            <p className={s.answer}>{answer}</p>
        </div>
    );
};

export default AnswerItem;