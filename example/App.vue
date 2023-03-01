<template>
  <div class="monaco-editor-vue2-demo">
    <h2 align="center">monacoEditor for vue2</h2>
    <el-button type="primary" size="small" @click="dialogVisible = true"> 打开dialog </el-button>
    <div class="monaco-editor-model-box">
      <monaco-editor-vue2
        :databaseOptions="dataBaseOptions"
        v-model="sql"
        :height="500"
        :width="500"
      ></monaco-editor-vue2>
      <el-input type="textarea" placeholder="请输入sql" v-model="sql" :rows="23"></el-input>
    </div>

    <el-dialog title="编译器在dialog中使用" :visible.sync="dialogVisible" width="50%">
      <monaco-editor-vue2
        :databaseOptions="dataBaseOptions"
        v-model="dialogSql"
        height="500"
      ></monaco-editor-vue2>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { DataBaseOption } from 'monaco-editor-vue2';
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      sql: '',
      dataBaseOptions: [],
      dialogVisible: false,
      dialogSql: '',
    };
  },
  methods: {
    initDataBaseOption() {
      // mock 一个数据库
      this.dataBaseOptions = [
        {
          name: 'test',
          tables: [
            {
              name: 'user',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'age',
                  type: 'int',
                },
              ],
            },
            {
              name: 'order',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                },
                {
                  name: 'user_id',
                  type: 'int',
                },
                {
                  name: 'order_name',
                  type: 'varchar',
                },
              ],
            },
          ],
        },
      ];
    },
  },
  mounted() {
    this.initDataBaseOption();
  },
});
</script>

<style scoped lang="less">
.monaco-editor-vue2-demo {
  position: relative;
  .monaco-editor-model-box {
    display: flex;
    .monaco-editor-vue2 {
      flex: 1;
    }
  }
}
</style>
