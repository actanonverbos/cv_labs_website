"use client"

import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  LogOut,
  Zap
} from 'lucide-react'

interface ValidationStatus {
  validations: {
    openai: { configured: boolean; status: 'working' | 'error' | 'unknown' }
    unsplash: { configured: boolean; status: 'working' | 'error' | 'unknown' }
    sanity: { configured: boolean; status: 'working' | 'error' | 'unknown' }
  }
  summary: {
    allConfigured: boolean
    allWorking: boolean
    readyToGenerate: boolean
  }
}

interface BlogGenerationJob {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  totalPosts: number
  processedPosts: number
  currentStep: string
  error?: string
  results: Array<{
    input: { headline: string; key_points: string }
    success: boolean
    sanityId?: string
    error?: string
  }>
  createdAt: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [validationStatus, setValidationStatus] = useState<ValidationStatus | null>(null)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvPreview, setCsvPreview] = useState<string>('')
  const [config, setConfig] = useState({
    publishImmediately: false,
    defaultAuthor: 'Convert Labs Team',
    defaultCategory: 'Web Design',
    brandVoice: 'professional'
  })
  const [currentJob, setCurrentJob] = useState<BlogGenerationJob | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checkJobStatus = useCallback(async (jobId: string) => {
    try {
      const response = await fetch(`/api/admin/generate-blog?jobId=${jobId}`)
      if (response.ok) {
        const job = await response.json()
        setCurrentJob(job)
      }
    } catch (error) {
      console.error('Failed to check job status:', error)
    }
  }, [])

  // Check validation status on load
  useEffect(() => {
    validateConfiguration()
  }, [])

  // Poll job status if there's an active job
  useEffect(() => {
    if (currentJob && (currentJob.status === 'pending' || currentJob.status === 'processing')) {
      const interval = setInterval(() => {
        checkJobStatus(currentJob.id)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [currentJob, checkJobStatus])

  const validateConfiguration = async () => {
    try {
      const response = await fetch('/api/admin/validate-config')
      if (response.ok) {
        const data = await response.json()
        setValidationStatus(data)
      }
    } catch (error) {
      console.error('Failed to validate configuration:', error)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'text/csv') {
      setCsvFile(file)
      
      // Preview first few lines
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const lines = text.split('\n').slice(0, 5)
        setCsvPreview(lines.join('\n'))
      }
      reader.readAsText(file)
    } else {
      setError('Please select a valid CSV file')
    }
  }

  const handleGenerateBlog = async () => {
    if (!csvFile) {
      setError('Please select a CSV file')
      return
    }

    if (!validationStatus?.summary.readyToGenerate) {
      setError('Configuration validation failed. Please check your API keys.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('csvFile', csvFile)
      formData.append('config', JSON.stringify(config))

      const response = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        // Start polling for job status
        setCurrentJob({
          id: data.jobId,
          status: 'pending',
          progress: 0,
          totalPosts: data.totalPosts,
          processedPosts: 0,
          currentStep: 'Starting...',
          results: [],
          createdAt: new Date().toISOString()
        })
      } else {
        setError(data.error || 'Failed to start blog generation')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getStatusIcon = (status: 'working' | 'error' | 'unknown', configured: boolean) => {
    if (!configured) return <XCircle className="h-4 w-4 text-destructive" />
    if (status === 'working') return <CheckCircle className="h-4 w-4 text-green-500" />
    if (status === 'error') return <XCircle className="h-4 w-4 text-destructive" />
    return <AlertCircle className="h-4 w-4 text-yellow-500" />
  }

  return (
    <div className="min-h-screen bg-muted/5">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">CV</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Blog Generator</h1>
              <p className="text-xs text-muted-foreground">Convert Labs Admin</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate Blog Posts</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            {/* Configuration Status */}
            {validationStatus && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">System Status</h2>
                  <Button variant="ghost" size="sm" onClick={validateConfiguration}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    {getStatusIcon(validationStatus.validations.openai.status, validationStatus.validations.openai.configured)}
                    <div>
                      <p className="font-medium text-sm">OpenAI API</p>
                      <p className="text-xs text-muted-foreground">Content Generation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    {getStatusIcon(validationStatus.validations.unsplash.status, validationStatus.validations.unsplash.configured)}
                    <div>
                      <p className="font-medium text-sm">Unsplash API</p>
                      <p className="text-xs text-muted-foreground">Image Fetching</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    {getStatusIcon(validationStatus.validations.sanity.status, validationStatus.validations.sanity.configured)}
                    <div>
                      <p className="font-medium text-sm">Sanity CMS</p>
                      <p className="text-xs text-muted-foreground">Content Publishing</p>
                    </div>
                  </div>
                </div>

                {!validationStatus.summary.readyToGenerate && (
                  <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-2" />
                    Please configure all API keys in your environment variables before generating blog posts.
                  </div>
                )}
              </Card>
            )}

            {/* File Upload */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Upload CSV File</h2>
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => document.getElementById('csv-upload')?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="text-sm font-medium text-primary hover:text-primary/80">
                      Choose CSV file
                    </div>
                    <p className="text-xs text-muted-foreground">
                      CSV should have columns: headline, key_points, category (optional), author_name (optional)
                    </p>
                  </div>
                </div>

                {csvFile && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{csvFile.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {(csvFile.size / 1024).toFixed(1)} KB
                      </Badge>
                    </div>
                    
                    {csvPreview && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs font-medium mb-2">Preview:</p>
                        <pre className="text-xs text-muted-foreground overflow-x-auto">
                          {csvPreview}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Configuration */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Generation Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-author">Default Author</Label>
                  <Input
                    id="default-author"
                    value={config.defaultAuthor}
                    onChange={(e) => setConfig(prev => ({ ...prev, defaultAuthor: e.target.value }))}
                    placeholder="Convert Labs Team"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-category">Default Category</Label>
                  <Input
                    id="default-category"
                    value={config.defaultCategory}
                    onChange={(e) => setConfig(prev => ({ ...prev, defaultCategory: e.target.value }))}
                    placeholder="Web Design"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publish-immediately"
                  checked={config.publishImmediately}
                  onChange={(e) => setConfig(prev => ({ ...prev, publishImmediately: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="publish-immediately" className="text-sm">
                  Publish immediately (otherwise save as drafts)
                </Label>
              </div>
            </Card>

            {/* Generate Button */}
            <Card className="p-6">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  {error}
                </div>
              )}
              
              <Button 
                onClick={handleGenerateBlog}
                disabled={loading || !csvFile || !validationStatus?.summary.readyToGenerate}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Starting Generation...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Blog Posts
                  </>
                )}
              </Button>
            </Card>

            {/* Job Progress */}
            {currentJob && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Generation Progress</h2>
                  <Badge variant={
                    currentJob.status === 'completed' ? 'default' :
                    currentJob.status === 'failed' ? 'destructive' :
                    'secondary'
                  }>
                    {currentJob.status}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{currentJob.currentStep}</span>
                      <span>{currentJob.processedPosts}/{currentJob.totalPosts}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${currentJob.progress}%` }}
                      />
                    </div>
                  </div>

                  {currentJob.error && (
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      <XCircle className="h-4 w-4 inline mr-2" />
                      {currentJob.error}
                    </div>
                  )}

                  {currentJob.results.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">Results:</h3>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {currentJob.results.map((result, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs p-2 rounded bg-muted/50">
                            {result.success ? (
                              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-3 w-3 text-destructive flex-shrink-0" />
                            )}
                            <span className="truncate">{result.input.headline}</span>
                            {result.sanityId && (
                              <Badge variant="outline" className="text-xs">
                                Created
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Environment Configuration</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Required Environment Variables:</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• <code>OPENAI_API_KEY</code> - For content generation</li>
                    <li>• <code>UNSPLASH_ACCESS_KEY</code> - For image fetching</li>
                    <li>• <code>SANITY_API_TOKEN</code> - For publishing to CMS</li>
                    <li>• <code>ADMIN_USERNAME</code> - Admin login username</li>
                    <li>• <code>ADMIN_PASSWORD_HASH</code> - Hashed admin password</li>
                    <li>• <code>JWT_SECRET</code> - JWT signing secret</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
