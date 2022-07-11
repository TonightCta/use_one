import navigation from './nav/Navigation'
import alert from './Alert'
import payway from './pay-way/pay-way-icon'
import footer from './footer/footer'
import "@/utils/svg";

const components = {
    'Navigation': navigation,
    'Alert': alert,
    'Pay-way': payway,
    'Foo-ter': footer
};

const install = function (Vue, opts = {}) {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
};
export default install;