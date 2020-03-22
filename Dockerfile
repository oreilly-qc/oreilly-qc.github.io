# We use the iqsharp-base image, as that includes
# the .NET Core SDK, IQ#, and Jupyter Notebook already
# installed for us.
FROM mcr.microsoft.com/quantum/iqsharp-base:0.10.2002.2610

# Add metadata indicating that this image is used for the QC book samples.
ENV IQSHARP_HOSTING_ENV=OREILLY_QC_BOOK_SAMPLES

# Make sure the contents of our repo are in ${HOME}
# Required for mybinder.org
COPY . ${HOME}
USER root
RUN chown -R ${USER} ${HOME} && \
    chmod +x ${HOME}/samples/QSharp/*.sh
USER ${USER}

# Pre-exec notebooks to improve first-use start time
WORKDIR ${HOME}/samples/QSharp
RUN ./prebuild.sh
