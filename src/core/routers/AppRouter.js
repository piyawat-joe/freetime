import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';
// import AddExpensePage from '../../components/AddExpensePage';
// import EditExpensePage from '../../components/EditExpensePage';
import NotFoundPage from './NotFoundPage';
// import SuccessPage from '../../components/Page/success';
// import LoginPage from '../../components/LoginPage';
// import LoginPage from '../../components/Login/';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
// import Header from '../../components/Header';
// import AppLoader from '../../biz/AppLoader';

export const history = createBrowserHistory();
const routes = [
{"type":"react","titleCode":"framework.appname.global-shop","serviceTitleCode":"appname.global-shop",
"kind":"app","preVersion":"0.1.4","version":"0.1.2","name":"global-shop","path":"customer-info","url":"https://192.168.1.51:3000/shop","repo":"","exact":false,"private":false,
"props":{"name":"customerId","type":"","value":"1"}},
{"type":"react","titleCode":"framework.appname.global-shop","serviceTitleCode":"appname.global-shop",
"kind":"app","preVersion":"0.1.4","version":"0.1.2","name":"global-shop2","path":"customer-test","url":"http://localhost:8090/shop","repo":"","exact":false,"private":false,
"props":{"customerId":1,"type":{},"value":""}}
];

const {ComponentToWrap, props, context} = this.props

const AppRouter = () => (
  <Router history={history}>
    <div>

    {/* <Header /> */}
      <Switch>
      {/* <PublicRoute path="/" component={ExpenseDashboardPage} exact={true}/> */}
        {/* <PublicRoute path="/login" component={LoginPage} exact={true} /> */}
        {/* <PublicRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PublicRoute path="/completed" component={SuccessPage} />
        <PublicRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} /> */}
        {/* {
          routes.map((r,id) => {
            if(r.private){
              return <PrivateRoute
              path={`/${r.path}`} 
              component={() => {
                return (<AppLoader 
                  app={{ name: r.name, url: r.url }}
                  {... r.props}
                  />)
                }
              }
              key={id}
              exact={ !!r.exact }
          />
            }else{
              return <PublicRoute
                  path={`/${r.path}`} 
                  component={() => {
                    return (<AppLoader 
                      app={{ name: r.name, url: r.url }}
                      {... r.props}
                      />)
                    }
                  }
                  key={id}
                  exact={ !!r.exact }
              />
             }
          })
        } */}
        <Route component={ComponentToWrap} {...props} {...context}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
