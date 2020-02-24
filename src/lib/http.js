import rp from "request-promise-native";
rp.defaults({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  resolveWithFullResponse: false
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
                    }`
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
          }`
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
      }`
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
        }`
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
      }`
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
      }`
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
      }`
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
      }`
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
    json: true
  };
  console.log(options);
  return rp(options).then(res => {
    if (key === "countries") {
      return ((res.data.allCountriesMasters || {}).nodes || []).map(i => ({
        countryId: i.countryId,
        countryName: i.countryName
      }));
    }
    if (key === "states") {
      return ((res.data.allStatesMasters || {}).nodes || []).map(i => ({
        stateId: i.stateId,
        stateName: i.stateName
      }));
    }
    if (key === "districts") {
      return ((res.data.allDistrictsMasters || {}).nodes || []).map(i => ({
        districtId: i.districtId,
        districtName: i.districtName
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

export function getLineListData() {
  return rp({
    uri: `${global.apiBaseUrl}/vector/lineList`,
    json: true
  });
}

export function applyFilter(params) {
  return rp({
    uri: `${global.apiBaseUrl}/vector/lineList`,
    method: "POST",
    body: params,
    json: true,
    jar: true
  });
}

export function getDashBoardData() {
  return rp({
    uri: `${global.apiBaseUrl}/vector/getDashBoardData`,
    json: true
  });
}

export function getVectorEntry(id) {
  return rp({
    uri: `${global.apiBaseUrl}/vector?id=${id}`,
    json: true
  });
}

export function submitFormData(inputObject, op, id) {
  const options = {
    jar: true,
    json: true,
    url: `${global.apiBaseUrl}/vector?op=${op}&id=${id}`,
    method: "POST",
    body: inputObject
  };
  console.log(options);
  return rp(options);
}
