import * as Fetch from '../../../../utils';

jest.mock('../../../../utils', () => ({
    Get: jest.fn(() => Promise.resolve({
        json: () => { }
    })),
    Post: jest.fn((url, data) => Promise.resolve({
        json: () => { }
    })),
}));

describe('[FCName]Service', () => {
    it('should ', () => {
        // Given

        // When

        // Then

    });
});