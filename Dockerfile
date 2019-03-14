FROM nginx:1.15.3-alpine
RUN mkdir -p /home/www/antd-admin/dist/
COPY ./dist /home/www/antd-admin/dist/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
