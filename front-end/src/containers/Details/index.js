import React, { useEffect, useState }            from 'react';
import { Accordion, Card, Container, Jumbotron } from 'react-bootstrap';
import { useDispatch, useSelector }              from 'react-redux';
import { fetchItemDetails }                      from '../../actions/catalogue.actions';
import Layout                                    from '../../components/Layout';

const ItemDetails = (props) => {
  const [itemDetail, setItemDetail] = useState({});
  const detail = useSelector((state) => state.details);
  const dispatch = useDispatch();
  useEffect(() => {
    setItemDetail(detail.details);
  }, [detail]);

  useEffect(() => {
    const { id } = props.location.state;
    // console.log(id);
    if (id) {
      console.log('Dispatching fetch Item request');
      dispatch(fetchItemDetails(id, 'external'));
    }
  }, []);

  const itemData = () => {
    return (
      <div>
        {Object.keys(itemDetail).map((value, index) => {
          return (
            <Accordion key={index}>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                  {value}
                </Accordion.Toggle>

                {Object.keys(itemDetail[value]).map((v, i) => {
                  return (
                    <Accordion.Collapse eventKey={`${index}`}>
                      <Card.Body
                        style={{
                          display       : 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{v}</span>
                        <span>
                          {itemDetail[value][v] === ''
                            ? 'Nill'
                            : itemDetail[value][v]}
                        </span>
                      </Card.Body>
                    </Accordion.Collapse>
                  );
                })}
              </Card>
            </Accordion>
          );
        })}
      </div>
    );
  };

  return (
    <Layout>
      <Jumbotron>
        <h1>
          {itemDetail.CoreDataSets
            ? `${itemDetail.CoreDataSets.Genus} ${itemDetail.CoreDataSets.SpeciesEpithet}`
            : ''}
        </h1>
      </Jumbotron>
      <Container>
        {detail.error.code > 200 ? detail.error.message : itemData()}
      </Container>
    </Layout>
  );
};
export default ItemDetails;
