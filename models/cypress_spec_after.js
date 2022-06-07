module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({
        project_id: {
            type: String
        },
        results: {
            stats: {
                suites: {
                    type: Number
                },
                tests: {
                    type: Number
                },
                passes: {
                    type: Number
                },
                pending: {
                    type: Number
                },
                skipped: {
                    type: Number
                },
                failures: {
                    type: Number
                },
                wallClockStartedAt: {
                    type: Date
                },
                wallClockEndedAt: {
                    type: Date
                },
                wallClockDuration: {
                    type: Number
                }
            },
            reporter: {
                type: String
            },
            reporterStats: {
                suites: {
                    type: Number
                },
                tests: {
                    type: Number
                },
                passes: {
                    type: Number
                },
                pending: {
                    type: Number
                },
                failures: {
                    type: Number
                },
                start: {
                    type: Date
                },
                end: {
                    type: Date
                },
                duration: {
                    type: Number
                },
                testsRegistered: {
                    type: Number
                },
                passPercent: {
                    type: Number
                },
                pendingPercent: {
                    type: Number
                },
                other: {
                    type: Number
                },
                hasOther: {
                    type: Boolean
                },
                skipped: {
                    type: Number
                },
                hasSkipped: {
                    type: Boolean
                }
            },
            hooks: {
                type: [
                    Object
                ]
            },
            tests: {
                type: [
                    Object
                ]
            },
            error: {
                type: Object
            },
            video: {
                type: String
            },
            screenshots: {
                type: [
                    Object
                ]
            },
            spec: {
                name: {
                    type: String
                },
                relative: {
                    type: String
                },
                absolute: {
                    type: String
                },
                specType: {
                    type: String
                }
            }
        },
        spec: {
            name: {
                type: String
            },
            relative: {
                type: String
            },
            absolute: {
                type: String
            },
            specType: {
                type: String
            }
        }

    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('cypress_spec_after', userSchema);

}