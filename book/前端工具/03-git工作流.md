# 1. GitHub Flow

特点：

- master 分支永远是可以随时发布的
- 需求新增基于 master 分支，并创建一个有语义化的分支
- 定期推送本地分支到远端
- 合并到 master 分支之前要进行充分测试部署，之后必须提 PR
- PR 一旦经过 code review 无误即可合并到 master，立即进行部署发布

优点：

- 分支足够简单，适合持续发布场景

缺点：

- 多版本产品线不适用



# 2. Git Flow

特点：

- 通常包括五种类型的分支，并有明确定义
  - Master 分支：主干分支，也是正式发版分支，包含可以部署到生产环境的代码，通常只允许其他分支合入，不允许向 Master 分支直接提交代码
  - Develop 分支：开发分支，用来集成测试最新合入的开发成果，包含要发布到下一个 Release 的代码
  - Feature 分支：特性分支，通常从 Develop 分支拉出，每个新特性开发对应一个特性分支，用于开发人员提交代码进行自测，自测完成后，将 Feature 分支合到 Develop 分支，进入下一个 Release
  - Release 分支：发布分支，发布新版本时候，基于 Develop 分支创建，发布完成后，合并到 Master 分支和 Develop 分支
  - Hot fix 分支：热修复分支，生产环境发现 Bug 时候基于 Master 创建的临时分支，问题验证后，合并到 Master 分支和 Develop 分支

优点：

- 分支任务功能明确
- 适合多个特性同时由多个开发人员独自开发各自的特性
- 可以同时处理上版本的发布以及下版本新特性的开发工作，上版本发布完成后合入 Master 与 Develop 分支

缺点：

- 合入成本较高
- 不适合修改频繁的项目



# 3. GitLab Flow

特点：

- 支持 GitFlow 的分支策略，也支持 GitHubFlow 的 Pull Request（在 GitLabFlow 中称为 Merge Request）
- 相比于 GitHubFlow，GitLabFlow 增加了对生产环境和与生产环境的管理
  - Master 分支：开发环境分支
  - Pre-Production 分支：预生产环境分支
  - Production 分支：生产环境分支
- 规定代码必须从上游向下游发展
  - Master --> Pre-Production --> Production
- 新功能或修复 Bug 时，特性分支代码测试无误时候，必须先合入 Master 分支，然后才能由 Master 分支向 Pre-Production 环境合入，最后由 Pre-Production 合入 Production
- GitLabFlow 中的 MergeRequest 是将一个分支合入到另一个分支的请求，通过 MergeRequest 可以对比合入分支和被合入分支的差异，也可以做代码的 Review。
- 设置 Master 保护分支，普通开发者不可以提交代码、合并代码
- 开发流程
  - 开发阶段：Feature 分支
    - 在 Master 分支上创建 Feature 分支开发功能，自测完成合并到 Master 分支
    - 合并完成后删除 Feature 分支
  - 测试阶段：Master 分支
    - 部署 Master 分支到测试环境，出现 Bug，直接在 Master 分支修改
  - 预发布阶段：Pre-Production 分支
    - Master 代码通过测试，基于 Master 创建 Pre-Prodution 分支
    - 预发布阶段出现 Bug，在 Pre-Production 分支上创建一个修复 Bug 分支
    - 修复 Bug 后，遵循上游优先，用 Master 合并 Bug 分支，部署测试环境验证
    - 通过验证用 Pre-Production 合并 Bug 分支，在预生产环境验证，通过测试删除 Bug 分支，不通过重复上述步骤
  - 发布阶段：Production 分支
    - 预发布阶段代码通过测试，基于 Pre-Production 创建 Production 分支，部署到正式环境
    - 正式环境出现 Bug，采用上游优先原则，与预发布阶段出现 Bug 一致解决步骤
  - 版本发布：
    - 在 Master 分支创建一个分支，命名比如 2-3-stable
    - 版本分支出现 bug 还是遵循上游优先原则，从 Master 分支开始修复 Bug，通过测试执行 git cherry-pick commitId，合并到版本发布分支上

优点：

- 适合多环境发布、多特性同时开发

缺点：

- 合入成本高