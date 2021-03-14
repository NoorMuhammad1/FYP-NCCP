import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCatalogue = () => {
  //catalogue state
  const catalogue = useSelector((state) => state.catalogue);

  //data for
  const [dataList, setDataList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  //search string hook
  const [search, setSearch] = useState("");

  //search filters hook
  const [searchFilter, setFilter] = useState({
    bacteria: false,
    fungi: false,
    archaea: false,
    antibody: false,
    microalgae: false,
    phage: false,
    virus: false,
    yeast: false,
  });

  //hook to identify if either to apply a filter or not
  const [applySearchFilter, setApplySearchFilter] = useState(false);

  //hook to identify if either to display th
  const [display, setDisplay] = useState(false);

  //useEffect for updating the dataList and filtered datalist on updating data in the catalogue
  useEffect(() => {
    setDataList(catalogue.catalogueData);
    setFilteredList(catalogue.catalogueData);
  }, [catalogue.catalogueData]);

  //useEffect for determining if to apply the search filter or not in case of change in the searchFilter
  //values
  useEffect(() => {
    let x = false;
    Object.keys(searchFilter).map((filter) => {
      x = x ^ searchFilter[filter];
      return true;
    });
    setApplySearchFilter(x);
  }, [searchFilter]);

  //useEffect to
  useEffect(() => {
    if (applySearchFilter) {
      setFilteredList(
        filteredList.filter((item) => {
          return searchFilter[item.OrganismType.toLowerCase()];
        })
      );
    } else {
      setFilteredList(dataList);
    }
  }, [applySearchFilter]);

  return { dataList, filteredList };
};

export default useCatalogue;
