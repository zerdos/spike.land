FROM devimage

# Install Node.js (if not already included by another template)
# This section might be redundant if the 'node' template is always used with this one.
# Consider adding a check or relying on the 'node' template dependency.
USER root
RUN apt-get update && apt-get install -y curl gnupg &&     curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - &&     apt-get install -y nodejs

# Install Wrangler CLI
RUN npm install -g wrangler
