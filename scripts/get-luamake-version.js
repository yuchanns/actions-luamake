const OWNER = 'actboy168';
const REPO = 'luamake';

const isSha = (value) => /^[0-9a-f]{40}$/i.test(value);

module.exports = async ({ github, core, context }) => {
  const requestedVersion = process.env.LUAMAKE_VERSION || 'latest';

  const tag = await resolveTag(github, requestedVersion);
  const commit = await resolveCommitSha(github, tag);

  core.setOutput('tag', tag);
  core.setOutput('commit', commit);

  core.info(`Resolved luamake version -> tag: ${tag}, commit: ${commit}`);
  return commit;
};

async function resolveTag(github, requestedVersion) {
  if (requestedVersion === 'latest') {
    const release = await github.rest.repos.getLatestRelease({
      owner: OWNER,
      repo: REPO,
    });
    return release.data.tag_name;
  }

  return requestedVersion;
}

async function resolveCommitSha(github, tagOrSha) {
  if (isSha(tagOrSha)) {
    await github.rest.repos.getCommit({
      owner: OWNER,
      repo: REPO,
      ref: tagOrSha,
    });
    return tagOrSha;
  }

  const { data: ref } = await github.rest.git.getRef({
    owner: OWNER,
    repo: REPO,
    ref: `tags/${tagOrSha}`,
  });

  let sha = ref.object.sha;

  if (ref.object.type === 'tag') {
    const { data: tagObj } = await github.rest.git.getTag({
      owner: OWNER,
      repo: REPO,
      tag_sha: sha,
    });
    sha = tagObj.object.sha;
  }

  return sha;
}
