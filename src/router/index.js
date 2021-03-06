import { createRouter, createWebHistory } from 'vue-router'
import Article from "../Pages/Challenges/Article_Preview_Card/Index.vue"
import ECommerce from "../Pages/Challenges/ECommerce/Index.vue"
import Index from "../Pages/Challenges/Index.vue";
import QRCode from "../Pages/Challenges/QRCode/Index.vue";
import Stats from "../Pages/Challenges/Stats_Preview_Card/Index.vue"
import Testimonials from "../Pages/Challenges/Testimonials/Index.vue"
import First404 from "../Pages/Error_Pages/404/First.vue"
import Healthly from "../Pages/Error_Pages/404/Healthly.vue";
import Error404Index from "../Pages/Error_Pages/404/Index.vue"
import ErrorsIndex from "../Pages/Error_Pages/Index.vue"
import Home from "../Pages/Home.vue"
import NotFound from "../Pages/NotFound.vue"

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/challenges', name: 'Challenges', component: Index },
    {
        path: '/challenges/qrcode', name: 'QRCode', component: QRCode,
        meta: {
            title: 'Frontend Mentor | QR code component',
        }
    },
    {
        path: '/challenges/stats', name: 'Stats', component: Stats,
        meta: {
            title: 'Frontend Mentor | Stats preview card component',
        }
    },
    {
        path: '/challenges/article-preview', name: 'Article', component: Article,
        meta: {
            title: 'Frontend Mentor | Article preview component',
        }
    },
    {
        path: '/challenges/testimonials', name: 'Testimonials', component: Testimonials,
        meta: {
            title: 'Frontend Mentor | Testimonials grid section',
        }
    },
    {
        path: '/challenges/ecommerce', name: 'ECommerce', component: ECommerce,
        meta: {
            title: 'Frontend Mentor | E-commerce product page',
        }
    },
    { path: '/errors', name: 'Errors', component: ErrorsIndex },
    { path: '/errors/404', name: 'Error404', component: Error404Index },
    { path: '/errors/404/first', name: 'First404', component: First404 },
    { path: '/errors/404/healthly', name: 'Healthly', component: Healthly },
    { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFound }
]

const router = createRouter({
    history: createWebHistory(), routes,
})


// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    } else if (previousNearestWithMeta) {
        document.title = previousNearestWithMeta.meta.title;
    }

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));

    next();
});


export default router