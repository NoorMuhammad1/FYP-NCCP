import { SearchOutlined }             from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Container, Form, Spinner, }  from 'react-bootstrap';
import { useDispatch, useSelector }   from 'react-redux';
import { Link }                       from 'react-router-dom';

import { addItemToCart, getCatalogueData, } from '../../actions';
import Layout                               from '../../components/Layout/index';
import PageHeader                           from '../../components/PageHeader';
import { ReactComponent as Bacteria }       from './Icons/bacterium-solid.svg';
import './style.css';

const Catalogue = (props) => {
  const { authenticate } = useSelector((state) => state.auth);
  const { catalogueData, fetching } = useSelector((state) => state.catalogue);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const filters = [
    'bacteria',
    'fungi',
    'archaea',
    'antibody',
    'microalgae',
    'phage',
    'virus',
    'yeast',
  ];

  const [searchFilters, setSearchFilters] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

  useEffect(() => {
    dispatch(getCatalogueData());
  }, []);

  useEffect(() => {
    setData(catalogueData);
  }, [catalogueData]);

  const columns = data[0] && Object.keys(data[0]);

  const search = (rows) => {
    return rows.filter((row) => {
      const applyFilter = searchFilters[0]
        ? searchFilters.includes(row['OrganismType'].toLowerCase())
        : true;
      // console.log(
      //   columns &&
      //     columns.some((column) => {
      //       return (
      //         applyFilter &&
      //         row[column]
      //           .toString()
      //           .toLowerCase()
      //           .indexOf(query.toLowerCase()) > -1
      //       );
      //     })
      // );
      return (
        columns &&
        columns.some((column) => {
          return (
            applyFilter &&
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
          );
        })
      );
    });
  };

  const addToCart = (row) => {
    const { id } = row;
    setAddedToCart([...addedToCart, id]);
    const { OrganismType, Genus, SpeciesEpithet } = row;
    dispatch(addItemToCart({ id: id, OrganismType, Genus, SpeciesEpithet }));
  };

  if (fetching) {
    <Layout>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Layout>;
  }

  return (
    <>
      <PageHeader />

      <div className="page-heading">
        <Container className="page-heading-content">
          <h1>Catalogue</h1>
        </Container>
      </div>

      <div className="catalogue-div">
        <Container className="catalogue-content">
          <div className="search-bar-box">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="search-bar-input"
            />
            <SearchOutlined className="search-bar-icon" fontSize="32px" />
          </div>
          <div className="search-filters-box">
            <h3>Filters</h3>
            <hr />
            {filters &&
            filters.map((filter) => {
              return (
                <Form.Check
                  label={filter}
                  name={filter}
                  className="filter-check"
                  checked={searchFilters.includes(filter)}
                  onChange={(e) => {
                    const checked = searchFilters.includes(filter);
                    setSearchFilters((prev) =>
                                       checked
                                         ? prev.filter((sf) => sf !== filter)
                                         : [...prev, filter]
                    );
                  }}
                />
              );
            })}
          </div>
          <div className="catalogue-data-content-box">
            <div>
              {search(data).map((row) => {
                return (
                  <div className="catalogue-data-item">
                    <div>
                      <Bacteria className="image" />
                      <h4 className="catalogue-data-item-organism-type">
                        {row.OrganismType}
                      </h4>
                    </div>
                    <div className="item-detail">
                      <Link
                        className="catalogue-data-item-name"
                        to={{
                          pathname: '/itemDetails',
                          state   : { id: row.id },
                        }}
                      >
                        <h4 className="item-name">{`${row.Genus} ${row.SpeciesEpithet}`}</h4>
                        {/* <h3 className="arrow-box">
                          <Arrow className="arrow" />
                        </h3> */}
                      </Link>
                      <span
                        className="catalogue-data-item-accession-number">{`Accession Number    ${row.AccessionNumber}`}</span>
                      <span className="catalogue-data-item-strain-type">{`Strain Type      ${row.Status}`}</span>
                      <span
                        className="catalogue-data-item-bio-hazard-level">{`Bio Hazard Level     ${row.BioHazardLevel}`}</span>
                    </div>
                    <div>
                      <span
                        className={
                          addedToCart.includes(row.id)
                            ? 'add-to-cart-button-disabled'
                            : 'add-to-cart-button'
                        }
                        onClick={(e) => addToCart(row)}
                      >
                        {addedToCart.includes(row.id)
                          ? 'Added To Cart'
                          : 'Add To Cart'}
                      </span>
                    </div>
                  </div>
                );
              })}
              {/* {search(data).map((row) => {
                return (
                  <div className="item-card">
                    <div className="item-type">
                      <Bacteria className="image" />
                      <div>{row.OrganismType}</div>
                    </div>
                    <div className="item-details">
                      <div className="details">
                        <div className="item-name-box">
                          <Link
                            className="item-name"
                            to={{
                              pathname: "/itemDetails",
                              state: { id: row._id },
                            }}
                          >
                            <span>{`${row.Genus} ${row.SpeciesEpithet}`}</span>
                            <span className="arrow-box">
                              <Arrow className="arrow" />
                            </span>
                          </Link>
                        </div>
                        <div className="item-accession-number">
                          {row.AccessionNumber}
                        </div>
                      </div>
                      <div className="cart-button">
                        <Button
                          variant="outline-primary"
                          onClick={(e) => addToCart(row)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "bold",
                            alignItems: "center",
                            fontSize: "0.8rem",
                          }}
                        >
                          <ShoppingCartIcon />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </Container>
      </div>

      {/* <Layout>
        <Jumbotron>
          <div id="upper-content">
            <h1>Catalogue</h1>
          </div>
          <div id="catalogue">
            <div id="filter-box">
              <div id="filters">
                <h5>Filters</h5>
                <hr />
                {filters &&
                  filters.map((filter) => {
                    return (
                      <Form.Check
                        label={filter}
                        name={filter}
                        className
                        checked={searchFilters.includes(filter)}
                        onChange={(e) => {
                          const checked = searchFilters.includes(filter);
                          setSearchFilters((prev) =>
                            checked
                              ? prev.filter((sf) => sf !== filter)
                              : [...prev, filter]
                          );
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            <div id="items">
              <Input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {search(data).map((row) => {
                return (
                  <div className="item-card">
                    <div className="item-type">
                      <Bacteria className="image" />
                      <div>{row["CoreDataSets"].OrganismType}</div>
                    </div>
                    <div className="item-details">
                      <div className="details">
                        <div className="item-name-box">
                          <Link
                            className="item-name"
                            to={{
                              pathname: "/itemDetails",
                              state: { id: row._id },
                            }}
                          >
                            <span>{`${row["CoreDataSets"].Genus} ${row["CoreDataSets"].SpeciesEpithet}`}</span>
                            <span className="arrow-box">
                              <Arrow className="arrow" />
                            </span>
                          </Link>
                        </div>
                        <div className="item-accession-number">
                          {row["CoreDataSets"].AccessionNumber}
                        </div>
                      </div>
                      <div className="cart-button">
                        <Button
                          variant="outline-primary"
                          onClick={(e) => addToCart(row)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "bold",
                            alignItems: "center",
                            fontSize: "0.8rem",
                          }}
                        >
                          <ShoppingCartIcon />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Jumbotron>
      </Layout> */}
    </>
  );
};

export default Catalogue;
