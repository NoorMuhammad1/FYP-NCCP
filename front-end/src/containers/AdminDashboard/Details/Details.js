import { Avatar, Button, TextField } from '@material-ui/core';
import TodayIcon                     from '@material-ui/icons/Today';
import SideBar                       from 'components/SideBar';
import Status                        from 'components/Status';
import React, { useState }           from 'react';
import ReactApexChart                from 'react-apexcharts';
import { Link }                      from 'react-router-dom';
import './Details.css';

const Details = () => {
  const [rangeDates, setRangeDates] = useState({
                                                 start: new Date().toISOString().substr(0, 10),
                                                 end  : new Date().toISOString().substr(0, 10),
                                               });

  const [activeUsersChartData, setActiveUsersChartData] = useState({
                                                                     series : [{
                                                                       name: 'Visitors',
                                                                       data: [23, 31, 40, 101, 40, 36, 32, 23, 14]
                                                                     }],
                                                                     options: {

                                                                       chart      : {

                                                                         type: 'bar',

                                                                       },
                                                                       plotOptions: {
                                                                         bar: {
                                                                           borderRadius: 10,
                                                                           dataLabels  : {
                                                                             position: 'top', // top, center, bottom
                                                                           },
                                                                         }
                                                                       },
                                                                       dataLabels : {
                                                                         enabled  : true,
                                                                         formatter: function (val) {
                                                                           return val;
                                                                         },
                                                                         offsetY  : -20,
                                                                         style    : {
                                                                           fontSize: '12px',
                                                                           colors  : ['#304758']
                                                                         }
                                                                       },

                                                                       xaxis: {
                                                                         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',],
                                                                         position  : 'top',
                                                                         axisBorder: {
                                                                           show: false
                                                                         },
                                                                         axisTicks : {
                                                                           show: false
                                                                         },
                                                                         crosshairs: {
                                                                           fill: {
                                                                             type    : 'gradient',
                                                                             gradient: {
                                                                               colorFrom  : '#D8E3F0',
                                                                               colorTo    : '#BED1E6',
                                                                               stops      : [0, 100],
                                                                               opacityFrom: 0.4,
                                                                               opacityTo  : 0.5,
                                                                             }
                                                                           }
                                                                         },
                                                                         tooltip   : {
                                                                           enabled: true,
                                                                         }
                                                                       },
                                                                       yaxis: {
                                                                         axisBorder: {
                                                                           show: false
                                                                         },
                                                                         axisTicks : {
                                                                           show: false,
                                                                         },
                                                                         labels    : {
                                                                           show     : false,
                                                                           formatter: function (val) {
                                                                             return val;
                                                                           }
                                                                         }

                                                                       },
                                                                       // title: {
                                                                       //   text: 'Monthly Inflation in Argentina, 2002',
                                                                       //   floating: true,
                                                                       //   offsetY: 330,
                                                                       //   align: 'center',
                                                                       //   style: {
                                                                       //     color: '#444'
                                                                       //   }
                                                                       // }
                                                                     },
                                                                   });

  const [salesChartData, setsalesChartData] = useState({
                                                         series : [{
                                                           name: 'series1',
                                                           data: [31, 40, 28, 51, 42, 109, 100]
                                                         }, {
                                                           name: 'series2',
                                                           data: [11, 32, 45, 32, 34, 52, 41]
                                                         }],
                                                         options: {
                                                           chart     : {
                                                             height: 350,
                                                             type  : 'area'
                                                           },
                                                           dataLabels: {
                                                             enabled: false
                                                           },
                                                           stroke    : {
                                                             curve: 'smooth'
                                                           },
                                                           xaxis     : {
                                                             type      : 'datetime',
                                                             categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z']
                                                           },
                                                           tooltip   : {
                                                             x: {
                                                               format: 'dd/MM/yy HH:mm'
                                                             },
                                                           },
                                                         },
                                                       });

  const [popularCategoriesChartData, setpopularCategoriesChartData] = useState({
                                                                                 series: [44, 55, 41, 17],

                                                                                 options   : {
                                                                                   labels     : ['Apple', 'Mango', 'Orange', 'Watermelon'],
                                                                                   chart      : {
                                                                                     background: '#fff',
                                                                                     animations: {
                                                                                       speed: 1300,
                                                                                     }
                                                                                   },
                                                                                   dataLabels : {
                                                                                     enabled: false,
                                                                                     // formatter: function (val) {
                                                                                     //   return val + "%"
                                                                                     // },
                                                                                   },
                                                                                   legend     : {
                                                                                     position       : 'bottom',
                                                                                     horizontalAlign: 'center',
                                                                                     fontSize       : '14px',
                                                                                     markers        : {
                                                                                       width : 20,
                                                                                       height: 20,
                                                                                       radius: 5,
                                                                                     }
                                                                                   },
                                                                                   plotOptions: {
                                                                                     pie: {
                                                                                       donut: {
                                                                                         size  : '75%',
                                                                                         labels: {
                                                                                           show : true,
                                                                                           total: {
                                                                                             show      : true,
                                                                                             showAlways: true,
                                                                                             label     : 'Samples Sold',
                                                                                             fontSize  : '14px',
                                                                                             color     : 'grey',
                                                                                             formatter : function (w) {
                                                                                               return '129,345';
                                                                                             },
                                                                                           }
                                                                                         }
                                                                                       },

                                                                                     }
                                                                                   }
                                                                                 },
                                                                                 dataLabels: {
                                                                                   enabled: false,
                                                                                 }
                                                                               });
  return (
    <SideBar active="Dashboard">
      <div className="admin-dashboard">
        <h3 className="component-heading">Main Dashboard</h3>
        <div className="dashboard-dates">
          <TextField
            id="start-date"
            className="starting-date"
            type="date"
            variant="outlined"
            label="From"
            value={rangeDates.start}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="end-date"
            className="ending-date"
            type="date"
            variant="outlined"
            label="To"
            value={rangeDates.start}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="card-div">
          <div className="total-orders-card card" id="total-orders-card">
            <p>Total Orders</p>
            <h4>25</h4>
          </div>
          <div className="total-orders-card card" id="total-orders-card">
            <p>Total Orders</p>
            <h4>49</h4>
          </div>
          <div className="total-orders-card card" id="total-orders-card">
            <p>Total Orders</p>
            <h4>78</h4>
          </div>
        </div>

        <div className="top-selling-div card">
          <h4 className="card-title">Top Selling</h4>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>
          <hr />
          <div className="product-details">
            <div className="product-name">
              <span>Bacillus Pakistaneasis</span>
            </div>
            <div className="sales-amount">
              45
            </div>
          </div>


        </div>
        <div className="sales-report card">Sales Report
          <ReactApexChart options={salesChartData.options} series={salesChartData.series} type="area" /></div>
        <div className="active-users card">
          <h4 className="card-title">Visitors</h4>
          <ReactApexChart options={activeUsersChartData.options} height="100%" series={activeUsersChartData.series}
                          type="bar" />
        </div>
        <div className="recent-reviews card">
          <h4 className="card-title">Recent Reviews</h4>
          <hr />
          <div>
            <div className="review-details">
              <div className="review-date">
                <TodayIcon className="review-icon" />
                <span>30 JUN, TUE</span>
              </div>
              <div className="review-text">
                The product was good.
              </div>
            </div>
            <hr />
            <div className="review-details">
              <div className="review-date">
                <TodayIcon className="review-icon" />
                <span>30 JUN, TUE</span>
              </div>
              <div className="review-text">
                The product was good.
              </div>
            </div>
            <hr />
            <div className="review-details">
              <div className="review-date">
                <TodayIcon className="review-icon" />
                <span>30 JUN, TUE</span>
              </div>
              <div className="review-text">
                The product was good.
              </div>
            </div>
            <hr />
            <div className="review-details">
              <div className="review-date">
                <TodayIcon className="review-icon" />
                <span>30 JUN, TUE</span>
              </div>
              <div className="review-text">
                The product was good.
              </div>
            </div>
            <hr />
            <div className="review-details">
              <div className="review-date">
                <TodayIcon className="review-icon" />
                <span>30 JUN, TUE</span>
              </div>
              <div className="review-text">
                The product was good.
              </div>
            </div>
            <hr />
            <Button variant="contained">
              <Link
                to="/dashboard/addUser"
                style={{ color: 'black', textDecoration: 'none' }}
              >
                See All
              </Link>
            </Button>
          </div>
        </div>
        <div className="popular-categories card">
          <h4 className="card-title">Popular Categories</h4>
          <ReactApexChart className="popular-categories-chart" height="90%" options={popularCategoriesChartData.options}
                          series={popularCategoriesChartData.series} type="donut" /></div>
        {/* <div className="deposit-periods card">Deposits in Periods</div> */}
        <div className="recent-orders card">
          <h4 className="card-title">Recent Orders</h4>
          <hr />
          <div className="recent-order-headers">
            <span className="date-header">Date</span>
            <span className="customer-header">Customer</span>
            <span className="status-header">Status</span>
            <span className="total-header">Total</span>
          </div>
          <hr />
          <div>
            <div className="recent-order-data">
              <span className="date-data">01 Jun 2020 17:56 AM</span>
              <span className="customer-data">
                <Avatar className="order-customer-image" />
                Paulie Allen
              </span>
              <span className="status-data">
                <Status status="Completed" />
                {/* Completed */}
              </span>
              <span className="total-data">

                $104.98
              </span>
            </div>
            <hr />
            <div className="recent-order-data">
              <span className="date-data">01 Jun 2020 17:56 AM</span>
              <span className="customer-data">
                <Avatar className="order-customer-image" />
                Paulie Allen
              </span>
              <span className="status-data">
              <Status status="Pending" />
              </span>
              <span className="total-data">
                $104.98
              </span>
            </div>
            <hr />
            <div className="recent-order-data">
              <span className="date-data">01 Jun 2020 17:56 AM</span>
              <span className="customer-data">
                <Avatar className="order-customer-image" />
                Paulie Allen
              </span>
              <span className="status-data">
              <Status status="Cancelled" />
              </span>
              <span className="total-data">
                $104.98
              </span>
            </div>
            <hr />
            <div className="recent-order-data">
              <span className="date-data">01 Jun 2020 17:56 AM</span>
              <span className="customer-data">
                <Avatar className="order-customer-image" />
                Paulie Allen
              </span>
              <span className="status-data">
              <Status status="Cancelled" />
              </span>
              <span className="total-data">
                $104.98
              </span>
            </div>
            <hr />
          </div>
          <Button variant="contained" className="see-all-button" style={{ marginRight: '4rem' }}>
            <Link
              to="/dashboard/addUser"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              See All
            </Link>
          </Button>
        </div>
        <div className="city-order-statistics card">City Order Statistics</div>
      </div>
    </SideBar>
  );
};

export default Details;
