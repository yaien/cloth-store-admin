import Dash from "../../shared/components/dash"
import Head from "../../shared/components/head"
import ItemForm from "../../shared/components/item-form"
import ItemSizes from "../../shared/components/item-sizes"
import ImageInput from "../../shared/components/image-input"
import { FC, useState, FormEvent, useMemo, useEffect } from "react"
import { useAPI } from "../../shared/hooks"
import { useRouter } from "next/router"
import { Item, Size, Picture, Cloudinary } from "../../lib/store"
import { Image, CloudinaryContext } from "cloudinary-react"
import {
  Container,
  Card,
  Form,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button,
} from "reactstrap"
import ImageList from "../../shared/components/image-list"

const Create: FC = () => {
  const api = useAPI()
  const router = useRouter()
  const [item, setItem] = useState<Item>({} as Item)

  const onChange = (change: Item) => setItem({ ...item, ...change })

  const onChangeSizes = (sizes: Size[]) => setItem({ ...item, sizes })

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      e.stopPropagation()
      await api.items.create(item)
      await router.push("/items")
    } catch (err) {
      console.error(err)
    }
  }

  const onPictureAdded = (picture: Picture) => {
    setItem((item) => {
      const pictures = item.pictures ? [...item.pictures, picture] : [picture]
      return { ...item, pictures }
    })
  }

  return (
    <Dash>
      <Head title="Create Item" />
      <Container className="mt-3">
        <Card>
          <CardHeader>Agregar Item</CardHeader>
          <CardBody>
            <Form onSubmit={onSubmit}>
              <Row>
                <Col md={6}>
                  <ItemForm item={item} onChange={onChange} />
                </Col>
                <Col md={6}>
                  <ItemSizes sizes={item?.sizes} onChange={onChangeSizes} />
                </Col>
              </Row>
              <Row>
                {item.pictures && <ImageList pictures={item.pictures} />}
                <ImageInput onAdded={onPictureAdded} />
              </Row>

              <Button type="submit" color="primary" block className="mt-3">
                Agregar
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </Dash>
  )
}

export default Create
