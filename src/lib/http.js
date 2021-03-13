// import rp from "request-promise-native";

const rp = require("request-promise-native").defaults({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  jar: true,
  json: true,
  resolveWithFullResponse: false,
});

const getPayload = (key, id) => {
  if (key === "countries") {
    return {
      query: `{
                        allCountriesMasters(condition: {}) {
                            nodes {
                            countryId
                            countryName
                            countryTamilName
                            male
                            female
                            transgender
                            domicile
                            ruralType
                            taluk
                            revenueVillage
                            lattitude
                            longitude
                            }
                        }
                    }`,
    };
  }
  if (key === "states") {
    return {
      query: `{
            allStatesMasters(condition:{ countryId: ${id} }){
              nodes{
                stateId
                stateName
              }
            }
          }`,
    };
  }
  if (key === "districts") {
    return {
      query: ` {
        allDistrictsMasters(condition:{ stateId: ${id} }){
            nodes{
              districtId
              districtName
            }
          }
      }`,
    };
  }
  if (key === "hud") {
    return {
      query: `{
        allHudMasters(condition: { districtId: ${id} }){
          nodes{
          hudId
          hudName 
          }
        }
        }`,
    };
  }
  if (key === "block") {
    return {
      query: `{
        allBlocksMasters(condition:{ hudId: ${id} }){
          nodes{
            blockId
            blockName
          }
          }
      }`,
    };
  }
  if (key === "village") {
    return {
      query: `{
        allVillagesMasters(condition: {blockId: ${id}}) {
          nodes {
            villageId
            villageName
            habitationsMastersByVillageId {
              totalCount
              __typename
            }
            villageTamilName
            male
            female
            transgender
            domicile
            ruralType
            taluk
            revenueVillage
            lattitude
            longitude
            __typename
          }
          __typename
        }
      }`,
    };
  }

  if (key === "habitation") {
    return {
      query: `{
        allHabitationsMasters(condition: {villageId: "${id}" }) {
          nodes {
            habitationId
            habitationName
            villageId
            streetsMastersByHabitationId {
              totalCount
              __typename
            }
            habitationTamilName
            male
            female
            transgender
            domicile
            ruralType
            taluk
            revenueVillage
            lattitude
            longitude
            household
            __typename
          }
          __typename
        }
      }`,
    };
  }

  if (key === "street") {
    return {
      query: `{
        allStreetsMasters(condition: {habitationId: "${id}"}) {
          nodes {
            streetId
            streetName
            habitationId
            villageId
            streetTamilName
            male
            female
            transgender
            domicile
            ruralType
            taluk
            revenueVillage
            lattitude
            longitude
            houseCount
            __typename
          }
          __typename
        }
      }`,
    };
  }
};

export function getResponse(key = "countries", id) {
  console.log(key, id);
  const payload = getPayload(key, id);
  const options = {
    url: `${global.apiUrl}/graphql`,
    method: "POST",
    form: payload,
    json: true,
  };
  console.log(options);
  return rp(options).then((res) => {
    console.log(res);
    if (key === "countries") {
      return ((res.data.allCountriesMasters || {}).nodes || []).map((i) => ({
        countryId: i.countryId,
        countryName: i.countryName,
      }));
    }
    if (key === "states") {
      return ((res.data.allStatesMasters || {}).nodes || []).map((i) => ({
        stateId: i.stateId,
        stateName: i.stateName,
      }));
    }
    if (key === "districts") {
      return ((res.data.allDistrictsMasters || {}).nodes || []).map((i) => ({
        districtId: i.districtId,
        districtName: i.districtName,
      }));
    }
    if (key === "hud") {
      return (res.data.allHudMasters || {}).nodes || [];
    }
    if (key === "block") {
      return (res.data.allBlocksMasters || {}).nodes || [];
    }
    if (key === "village") {
      return (res.data.allVillagesMasters || {}).nodes || [];
    }
    if (key === "habitation") {
      return (res.data.allHabitationsMasters || {}).nodes || [];
    }
    if (key === "street") {
      return (res.data.allStreetsMasters || {}).nodes || [];
    }
    return [];
  });
}

export function getLineListData(path = "vector") {
  console.log(
    path,
    `${global.apiBaseUrl}/${path !== "vector" ? "water" : "vector"}/lineList`
  );
  return rp({
    uri: `${global.apiBaseUrl}/${
      path !== "vector" ? "water" : "vector"
    }/lineList`,
    json: true,
  });
}

export function applyFilter(params, path = "vector") {
  console.log(path, params);
  return rp({
    uri: `${global.apiBaseUrl}/${
      path !== "vector" ? "water" : "vector"
    }/lineList`,
    method: "POST",
    body: params,
    json: true,
    jar: true,
  });
}

export function getDashBoardData(path) {
  console.log(
    `${global.apiBaseUrl}/${
      path !== "vector" ? "water" : "vector"
    }/getDashBoardData`
  );
  return rp({
    uri: `${global.apiBaseUrl}/${
      path !== "vector" ? "water" : "vector"
    }/getDashBoardData`,
    json: true,
  });
}

export function getEntry(id, path = "vector", recordType) {
  console.log(
    `${global.apiBaseUrl}/${
      path !== "vector" ? "water" : "vector"
    }?id=${id}&recordType=${recordType}&userId=${localStorage.getItem(
      "userId"
    )}`
  );
  return rp({
    uri: `${global.apiBaseUrl}/${
      path !== "vector" ? "water" : "vector"
    }?id=${id}&recordType=${recordType}&userId=${localStorage.getItem(
      "userId"
    )}`,
    json: true,
  });
}

export function submitVectorFormData(inputObject, op, id) {
  const options = {
    jar: true,
    json: true,
    url: `${global.apiBaseUrl}/vector?op=${op}&id=${id}`,
    method: "POST",
    body: inputObject,
  };
  console.log(options);
  return rp(options);
}

export function submitWaterFormData(inputObject, op, id) {
  const options = {
    jar: true,
    json: true,
    url: `${global.apiBaseUrl}/water?op=${op}&id=${id}`,
    method: "POST",
    body: inputObject,
  };
  console.log(options);
  return rp(options);
}

export function submitWaterLabFormData(inputObject, id, op) {
  const options = {
    jar: true,
    json: true,
    url: `${global.apiBaseUrl}/water?id=${id}&lab=true&op=${op}`,
    method: "POST",
    body: inputObject,
  };
  console.log(options);
  return rp(options);
}

export function submitLogin(payload) {
  const options = {
    method: "POST",
    url: `${global.apiBaseUrl}/login`,
    body: payload,
  };
  console.log(options);
  return rp(options);
}
