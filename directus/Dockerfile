FROM directus/directus:9.11.0

WORKDIR /directus

RUN mkdir -p snapshots

VOLUME /directus/snapshots

COPY ./snapshots/booking-start.yaml /directus/snapshots

RUN mkdir -p seeddata

VOLUME /directus/seeddata

COPY ./seeddata/ /directus/seeddata

COPY ./extensions/ /directus/extensions

EXPOSE 8055

CMD \
  npx directus bootstrap && \
  npx directus start