[CmdletBinding()]
param (
    [Parameter(Position = 0, Mandatory = $false)]
    [string]$TargetVersion
)

$ErrorActionPreference = "Stop"

$scriptPath = Join-Path $PSScriptRoot "github-date-formatter.user.js"
if (-not (Test-Path -LiteralPath $scriptPath)) {
    Write-Error "Userscript file not found at: $scriptPath"
    exit 1
}

$content = [System.IO.File]::ReadAllText($scriptPath, [System.Text.Encoding]::UTF8)

# Read current version
$versionMatch = [regex]::Match($content, '(?m)^\/\/\s*@version\s+([^\r\n]+)')
if (-not $versionMatch.Success) {
    Write-Error "Could not find @version field in $scriptPath"
    exit 1
}

$currentVersion = $versionMatch.Groups[1].Value.Trim()

if ([string]::IsNullOrWhiteSpace($TargetVersion)) {
    # Auto bump patch version if no argument provided
    if ($currentVersion -match '^(\d+)\.(\d+)\.(\d+)$') {
        $major = [int]$matches[1]
        $minor = [int]$matches[2]
        $patch = [int]$matches[3] + 1
        $newVersion = "$major.$minor.$patch"
    } else {
        Write-Error "Current version '$currentVersion' is not semver (x.y.z). Please specify target version explicitly."
        exit 1
    }
} else {
    $newVersion = $TargetVersion.TrimStart('v').Trim()
}

$tag = "v$newVersion"

# Check if tag already exists
$tagCheck = git tag -l $tag
if (-not [string]::IsNullOrWhiteSpace($tagCheck)) {
    Write-Error "Tag $tag already exists in git repository."
    exit 1
}

# Update version in file
$newContent = [regex]::Replace($content, '(?m)^\/\/\s*@version\s+[^\r\n]+', "// @version      $newVersion")
[System.IO.File]::WriteAllText($scriptPath, $newContent, [System.Text.UTF8Encoding]::new($false))

# Commit and Tag
git add $scriptPath
git commit -m "chore(release): $newVersion"
git tag $tag

# Push commit and tag together
git push origin HEAD
git push origin $tag

Write-Output "Successfully released and pushed $tag"
