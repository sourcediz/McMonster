import axios from 'axios';
import {GOOGLE} from '../../constants/google';

type TgetMacdonalsParams = {
  lat: number;
  lng: number;
};

export const getMacdonals = ({lat, lng}: TgetMacdonalsParams) => {
  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=10000&type=restaurant&keyword=macdonals&key=${GOOGLE.apiKey}`,
    headers: {},
  };

  return axios(config)
    .then(function (response) {
      return response.data.results;
    })
    .catch(function (error) {
      console.log(error);
    });
};
