module.exports = async function (mongoose) {

  const userSchema = new mongoose.Schema(
    {
      project_id: {
        type: String
      },
      startedTestsAt: {
        type: Date
      },
      endedTestsAt: {
        type: Date
      },
      totalDuration: {
        type: Number
      },
      totalSuites: {
        type: Number
      },
      totalTests: {
        type: Number
      },
      totalFailed: {
        type: Number
      },
      totalPassed: {
        type: Number
      },
      totalPending: {
        type: Number
      },
      totalSkipped: {
        type: Number
      },
      runs: {
        type: [
          Object
        ]
      },
      browserPath: {
        type: String
      },
      browserName: {
        type: String
      },
      browserVersion: {
        type: String
      },
      osName: {
        type: String
      },
      osVersion: {
        type: String
      },
      cypressVersion: {
        type: String
      },
      config: {
        baseUrl: {
          type: String
        },
        projectId: {
          type: String
        },
        reporter: {
          type: String
        },
        reporterOptions: {
          configFile: {
            type: String
          }
        },
        projectRoot: {
          type: String
        },
        projectName: {
          type: String
        },
        rawJson: {
          baseUrl: {
            type: String
          },
          projectId: {
            type: String
          },
          reporter: {
            type: String
          },
          reporterOptions: {
            configFile: {
              type: String
            }
          },
          envFile: {},
          projectRoot: {
            type: String
          },
          projectName: {
            type: String
          }
        },
        configFile: {
          type: String
        },
        morgan: {
          type: Boolean
        },
        isTextTerminal: {
          type: Boolean
        },
        socketId: {
          type: String
        },
        report: {
          type: Boolean
        },
        browsers: {
          type: [
            Object
          ]
        },
        animationDistanceThreshold: {
          type: Number
        },
        blockHosts: {
          type: Object
        },
        chromeWebSecurity: {
          type: Boolean
        },
        clientCertificates: {
          type: Array
        },
        component: {},
        componentFolder: {
          type: String
        },
        defaultCommandTimeout: {
          type: Number
        },
        downloadsFolder: {
          type: String
        },
        e2e: {},
        env: {},
        execTimeout: {
          type: Number
        },
        experimentalFetchPolyfill: {
          type: Boolean
        },
        experimentalInteractiveRunEvents: {
          type: Boolean
        },
        experimentalSessionSupport: {
          type: Boolean
        },
        experimentalSourceRewriting: {
          type: Boolean
        },
        experimentalStudio: {
          type: Boolean
        },
        fileServerFolder: {
          type: String
        },
        fixturesFolder: {
          type: String
        },
        ignoreTestFiles: {
          type: String
        },
        includeShadowDom: {
          type: Boolean
        },
        integrationFolder: {
          type: String
        },
        keystrokeDelay: {
          type: Number
        },
        modifyObstructiveCode: {
          type: Boolean
        },
        numTestsKeptInMemory: {
          type: Number
        },
        pageLoadTimeout: {
          type: Number
        },
        pluginsFile: {
          type: String
        },
        port: {
          type: Number
        },
        redirectionLimit: {
          type: Number
        },
        requestTimeout: {
          type: Number
        },
        resolvedNodePath: {
          type: String
        },
        resolvedNodeVersion: {
          type: String
        },
        responseTimeout: {
          type: Number
        },
        retries: {
          runMode: {
            type: Number
          },
          openMode: {
            type: Number
          }
        },
        screenshotOnRunFailure: {
          type: Boolean
        },
        screenshotsFolder: {
          type: String
        },
        slowTestThreshold: {
          type: Number
        },
        scrollBehavior: {
          type: String
        },
        supportFile: {
          type: Boolean
        },
        supportFolder: {
          type: Boolean
        },
        taskTimeout: {
          type: Number
        },
        testFiles: {
          type: String
        },
        trashAssetsBeforeRuns: {
          type: Boolean
        },
        userAgent: {
          type: Object
        },
        video: {
          type: Boolean
        },
        videoCompression: {
          type: Number
        },
        videosFolder: {
          type: String
        },
        videoUploadOnPasses: {
          type: Boolean
        },
        viewportHeight: {
          type: Number
        },
        viewportWidth: {
          type: Number
        },
        waitForAnimations: {
          type: Boolean
        },
        watchForFileChanges: {
          type: Boolean
        },
        autoOpen: {
          type: Boolean
        },
        clientRoute: {
          type: String
        },
        devServerPublicPathRoute: {
          type: String
        },
        hosts: {
          type: Object
        },
        isInteractive: {
          type: Boolean
        },
        namespace: {
          type: String
        },
        reporterRoute: {
          type: String
        },
        socketIoCookie: {
          type: String
        },
        socketIoRoute: {
          type: String
        },
        xhrRoute: {
          type: String
        },
        cypressEnv: {
          type: String
        },
        resolved: {
          animationDistanceThreshold: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          baseUrl: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          blockHosts: {
            value: {
              type: Object
            },
            from: {
              type: String
            }
          },
          chromeWebSecurity: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          clientCertificates: {
            value: {
              type: Array
            },
            from: {
              type: String
            }
          },
          component: {
            value: {},
            from: {
              type: String
            }
          },
          componentFolder: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          defaultCommandTimeout: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          downloadsFolder: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          e2e: {
            value: {},
            from: {
              type: String
            }
          },
          env: {},
          execTimeout: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          experimentalFetchPolyfill: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          experimentalInteractiveRunEvents: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          experimentalSessionSupport: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          experimentalSourceRewriting: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          experimentalStudio: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          fileServerFolder: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          fixturesFolder: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          ignoreTestFiles: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          includeShadowDom: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          integrationFolder: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          keystrokeDelay: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          modifyObstructiveCode: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          numTestsKeptInMemory: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          pageLoadTimeout: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          pluginsFile: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          port: {
            value: {
              type: Object
            },
            from: {
              type: String
            }
          },
          projectId: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          redirectionLimit: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          reporter: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          reporterOptions: {
            value: {
              configFile: {
                type: String
              }
            },
            from: {
              type: String
            }
          },
          requestTimeout: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          resolvedNodePath: {
            value: {
              type: Object
            },
            from: {
              type: String
            }
          },
          resolvedNodeVersion: {
            value: {
              type: Object
            },
            from: {
              type: String
            }
          },
          responseTimeout: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          retries: {
            value: {
              runMode: {
                type: Number
              },
              openMode: {
                type: Number
              }
            },
            from: {
              type: String
            }
          },
          screenshotOnRunFailure: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          screenshotsFolder: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          slowTestThreshold: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          scrollBehavior: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          supportFile: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          supportFolder: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          taskTimeout: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          testFiles: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          trashAssetsBeforeRuns: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          userAgent: {
            value: {
              type: Object
            },
            from: {
              type: String
            }
          },
          video: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          videoCompression: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          videosFolder: {
            value: {
              type: String
            },
            from: {
              type: String
            }
          },
          videoUploadOnPasses: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          viewportHeight: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          viewportWidth: {
            value: {
              type: Number
            },
            from: {
              type: String
            }
          },
          waitForAnimations: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          watchForFileChanges: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          },
          browsers: {
            value: {
              type: [
                Object
              ]
            },
            from: {
              type: String
            }
          },
          hosts: {
            value: {
              type: Object
            },
            from: {
              type: String
            }
          },
          isInteractive: {
            value: {
              type: Boolean
            },
            from: {
              type: String
            }
          }
        },
        parentTestsFolder: {
          type: String
        },
        parentTestsFolderDisplay: {
          type: String
        },
        scaffoldedFiles: {
          type: [
            Object
          ]
        },
        proxyUrl: {
          type: String
        },
        browserUrl: {
          type: String
        },
        reporterUrl: {
          type: String
        },
        xhrUrl: {
          type: String
        },
        proxyServer: {
          type: String
        },
        state: {}
      },
      status: {
        type: String
      }
    });


  userSchema.plugin(require('mongoose-paginate-v2'))



  return mongoose.model('cypress_project_after', userSchema);

}