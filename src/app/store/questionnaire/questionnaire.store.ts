import { Injectable } from '@angular/core';
import { Store } from '../store';
import { QuestionnaireState } from './questionnaire.state';
import { IQuestion } from '../../models/questionnaire.model';

@Injectable()
export class QuestionnaireStore extends Store<QuestionnaireState> {
    constructor() {
        super(new QuestionnaireState());
    }

    setQuestions(questions: Array<IQuestion>): void {
        this.setState({
            ...this.state,
            questions: questions
        });
    }

    getQuestions() {
        return this.state.questions;
    }
}