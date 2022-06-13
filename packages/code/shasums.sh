find js -type f -exec sha256sum {} \; | grep -v node_modules | awk '{print "\"" substr($2,4) "\": \"" $1 "\","}' |  awk 'BEGIN{print "export const shasums = {"}{print $0}END{print "}"}' > shasums.ts;
