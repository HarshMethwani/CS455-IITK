import axios from 'axios';
import { fetchHint } from './fetchHint'; 

jest.mock('axios');

describe('fetchHint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns the correct hint when API call is successful', async () => {
    const mockResponse = {
      data: [
        {
          meanings: [
            {
              definitions: [
                { definition: 'A test definition' }
              ]
            }
          ]
        }
      ]
    };
    axios.get.mockResolvedValue(mockResponse);

    const hint = await fetchHint('testword');
    expect(hint).toBe('A test definition');
  });

  test('returns "No hint available" when API call fails', async () => {
    // Simulate an API failure
    axios.get.mockRejectedValue(new Error('Network Error'));

    const hint = await fetchHint('testword');
    expect(hint).toBe('No hint available');
  });

  test('returns "No hint available" when API response is malformed', async () => {
    // Mock the axios response with unexpected data structure
    const mockResponse = { data: [{}] };
    axios.get.mockResolvedValue(mockResponse);

    const hint = await fetchHint('testword');
    expect(hint).toBe('No hint available');
  });
});
