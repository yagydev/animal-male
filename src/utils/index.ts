import axios from "axios";
import prettyMilliseconds from "pretty-ms";

export const convertJsonToFormData = (object: Record<string, any>): FormData =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

export const prettyTime = (time?: Date | number) => {
  const now = new Date().getTime();
  if (typeof time === "undefined") {
    return prettyMilliseconds(now - new Date().getTime());
  }
  return `${prettyMilliseconds(now - new Date(time).getTime(), {
    compact: true,
  })} ago`;
};

export const isPhoneNumberValid = (phone: string) => {
  return /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
    phone
  );
};

export const fetchWithCache = async (url: string) => {
  const cache = localStorage.getItem(url);
  if (cache) {
    return JSON.parse(cache);
  }
  try {
    const { data } = await axios.get(url);
    localStorage.setItem(url, JSON.stringify(data));
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export function distanceBetweenCoordinates(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km
  return dist.toFixed(2);
}
