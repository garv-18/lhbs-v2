$envContent = Get-Content ".env"
foreach ($line in $envContent) {
    if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) {
        continue
    }
    
    $index = $line.IndexOf("=")
    if ($index -gt 0) {
        $key = $line.Substring(0, $index).Trim()
        $val = $line.Substring($index + 1).Trim()
        
        # Remove surrounding quotes if they exist
        if (($val.StartsWith('"') -and $val.EndsWith('"')) -or ($val.StartsWith("'") -and $val.EndsWith("'"))) {
            $val = $val.Substring(1, $val.Length - 2)
        }

        Write-Host "Adding $key to production..."
        npx vercel env rm $key production -y 2>$null
        $val | npx vercel env add $key production
    }
}
Write-Host "All environment variables pushed successfully."
