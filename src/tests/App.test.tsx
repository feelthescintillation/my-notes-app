import React from 'react';
import { render } from '@testing-library/react';
import { AppConnected } from '../components/App/App';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { NoteApplicationState } from '../types/state/noteApplicationState';

const mockState: NoteApplicationState = {
    app: {
        folderList: {},
        noteList: {},
        selectedFolderId: '',
        selectedNoteId: '',
        user: { id: '' },
    },
};
const mockStore = configureStore([]);

let store: any;
beforeEach(() => {
    store = mockStore(mockState);
});

test('renders learn react link', () => {
    const { getByText } = render(
        <Provider store={store}>
            <AppConnected />
        </Provider>,
    );
    const header = getByText(/My Note App/i);
    expect(header).toBeInTheDocument();
});
