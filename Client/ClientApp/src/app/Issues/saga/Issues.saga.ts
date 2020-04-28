import { put } from "@redux-saga/core/effects";

import { ApiResponse } from "@utils/api/ApiResponse";
import { AppAction } from "@utils/redux/AppAction";
import { IssuesApi } from "@api/IssuesApi";
import { IssuesStoreSelectors } from "@app/selectors/Issues.store.selectors";
import { SagaBase } from "@utils/saga/SagaBase";

import { IssueFilter } from "../models/IssueFilter";
import { Issue } from "../models/Issue";
import {
    ICloseIssueData, IFilterChangeData,
    IOpenIssueToEditCreateData,
    IOpenIssueToEditData
} from "../redux/Issues.actions.dataTypes";
import { IssuesActions } from "../redux/Issues.actions";
import { IssuesStore } from "../redux/Issues.store";

export class IssuesSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<IssuesStore>) {
        yield put(IssuesActions.updateStore(partialStore));
    }

    public static* loadIssues(action: AppAction) {
        yield IssuesSaga.updateStore({
            issuesAreLoading: true,
        });

        const response: ApiResponse<Issue[]> = yield IssuesApi.getIssues();
        if (response.hasError()) {
            yield IssuesSaga.updateStore({
                issuesAreLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield IssuesSaga.updateStore({
            issuesAreLoading: false,
            issues: response.data,
        });
    }

    public static* openIssueToCreate(action: AppAction<IOpenIssueToEditCreateData>) {
        action.payload.openIssuePanel();
    }

    public static* openIssueToEdit(action: AppAction<IOpenIssueToEditData>) {
        action.payload.openIssuePanel();
    }

    public static* closeIssue(action: AppAction<ICloseIssueData>) {
        action.payload.closeIssuePanel();
    }

    public static* changeIssueFilter(action: AppAction<IFilterChangeData>) {
        let filter: IssueFilter = yield IssuesStoreSelectors.filter();
        filter = filter.reassignReference();
        filter.toggleItemActivation(action.payload.filterItem);

        yield IssuesSaga.updateStore({
            filter,
        });
    }
}
